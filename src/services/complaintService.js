import {
  collection, doc, addDoc, getDoc, getDocs, updateDoc,
  query, where, orderBy, limit, serverTimestamp,
  onSnapshot, writeBatch
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../lib/firebase';

// ── Token generator ───────────────────────────────────────────────────────────
export function genToken() {
  return 'CIV-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
}

// ── Upload photo ──────────────────────────────────────────────────────────────
export async function uploadPhoto(file, userId) {
  const storageRef = ref(storage, `complaint-images/${userId}/${Date.now()}_${file.name}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef); 
}

// ── Duplicate detection ───────────────────────────────────────────────────────
// Returns array of possible duplicates [{id, token, title, status, reportCount, ...}]
export async function findDuplicates({ category, lat, lng, title, description }) {
  if (!category) return [];

  // Fetch recent open complaints in the same category (last 200, fast)
  const q = query(
    collection(db, 'complaints'),
    where('category', '==', category),
    where('status', 'in', ['Submitted', 'Acknowledged', 'In Progress']),
    orderBy('createdAt', 'desc'),
    limit(200)
  );

  const snap = await getDocs(q);
  if (snap.empty) return [];

  const candidates = snap.docs.map(d => ({ id: d.id, ...d.data() }));

  const results = candidates
    .map(c => {
      let score = 30; // category always matches

      // Location: up to 40 pts
      if (lat && lng && c.lat && c.lng) {
        const dist = getDistKm(lat, lng, c.lat, c.lng);
        if (dist < 0.1)      score += 40;
        else if (dist < 0.5) score += 30;
        else if (dist < 1)   score += 20;
        else if (dist < 3)   score += 10;
      }

      // Keyword overlap: up to 30 pts
      const input = new Set(`${title} ${description}`.toLowerCase().split(/\s+/).filter(w => w.length > 3));
      const existing = new Set(`${c.title} ${c.description}`.toLowerCase().split(/\s+/).filter(w => w.length > 3));
      let overlap = 0;
      input.forEach(w => { if (existing.has(w)) overlap++; });
      score += input.size > 0 ? Math.min(30, Math.round((overlap / input.size) * 30)) : 0;

      return { ...c, score };
    })
    .filter(c => c.score >= 60)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return results;
}

function getDistKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ── Submit complaint ──────────────────────────────────────────────────────────
export async function submitComplaint(data, photoFile, linkedDuplicateId = null) {
  let photoURL = '';
  if (photoFile) {
    try { photoURL = await uploadPhoto(photoFile, data.userId); }
    catch (e) { console.warn('Photo upload failed, continuing without photo:', e.message); }
  }

  const token = genToken();
  const batch = writeBatch(db);

  const complaintRef = doc(collection(db, 'complaints'));
  const complaintData = {
    token,
    userId:       data.userId,
    userName:     data.userName || '',
    userEmail:    data.userEmail || '',
    userPhone:    data.userPhone || '',
    category:     data.category,
    subCategory:  data.subCategory || '',
    severity:     data.severity || 'Moderate',
    priority:     'Medium',
    title:        data.title,
    description:  data.description,
    ward:         data.ward || '',
    address:      data.address || '',
    lat:          data.lat || null,
    lng:          data.lng || null,
    photoURL,
    anonymous:    data.anonymous || false,
    status:       'Submitted',
    department:   '',
    reportCount:  1,
    duplicateGroupId: linkedDuplicateId || null,
    createdAt:    serverTimestamp(),
    updatedAt:    serverTimestamp(),
  };

  batch.set(complaintRef, complaintData);

  // Status history subcollection
  const histRef = doc(collection(db, 'complaints', complaintRef.id, 'statusHistory'));
  batch.set(histRef, {
    status: 'Submitted',
    note:   'Complaint submitted by citizen.',
    updatedBy: data.userId,
    updatedByName: data.userName || 'Citizen',
    createdAt: serverTimestamp(),
  });

  // If linked duplicate — increment reportCount on primary
  if (linkedDuplicateId) {
    const primaryRef = doc(db, 'complaints', linkedDuplicateId);
    const primarySnap = await getDoc(primaryRef);
    if (primarySnap.exists()) {
      const currentCount = primarySnap.data().reportCount || 1;
      batch.update(primaryRef, { reportCount: currentCount + 1, updatedAt: serverTimestamp() });
    }
  }

  await batch.commit();
  return { id: complaintRef.id, token };
}

// ── Fetch public complaints (no PII) ─────────────────────────────────────────
export async function fetchPublicComplaints({ category, status, search } = {}) {
  let q = query(collection(db, 'complaints'), orderBy('createdAt', 'desc'), limit(50));
  if (category && category !== 'all') q = query(collection(db, 'complaints'), where('category', '==', category), orderBy('createdAt', 'desc'), limit(50));

  const snap = await getDocs(q);
  let results = snap.docs.map(d => {
    const data = d.data();
    // Strip all PII
    return {
      id: d.id,
      token:       data.token,
      title:       data.title,
      description: data.description,
      category:    data.category,
      subCategory: data.subCategory,
      address:     data.address,
      ward:        data.ward,
      status:      data.status,
      priority:    data.priority,
      severity:    data.severity,
      photoURL:    data.anonymous ? '' : data.photoURL,
      reportCount: data.reportCount || 1,
      createdAt:   data.createdAt,
      updatedAt:   data.updatedAt,
    };
  });

  if (status && status !== 'all') results = results.filter(r => r.status === status);
  if (search) {
    const s = search.toLowerCase();
    results = results.filter(r =>
      r.title?.toLowerCase().includes(s) ||
      r.description?.toLowerCase().includes(s) ||
      r.token?.toLowerCase().includes(s) ||
      r.address?.toLowerCase().includes(s)
    );
  }
  return results;
}

// ── Fetch citizen's own complaints ────────────────────────────────────────────
export async function fetchMyComplaints(userId) {
  const q = query(
    collection(db, 'complaints'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// ── Fetch a single complaint with status history ──────────────────────────────
export async function fetchComplaintDetail(complaintId) {
  const snap = await getDoc(doc(db, 'complaints', complaintId));
  if (!snap.exists()) throw new Error('Complaint not found');
  const data = { id: snap.id, ...snap.data() };

  const histSnap = await getDocs(
    query(collection(db, 'complaints', complaintId, 'statusHistory'), orderBy('createdAt', 'asc'))
  );
  data.statusHistory = histSnap.docs.map(d => ({ id: d.id, ...d.data() }));
  return data;
}

// ── Find complaint by token ───────────────────────────────────────────────────
export async function findByToken(token) {
  const q = query(collection(db, 'complaints'), where('token', '==', token.trim().toUpperCase()));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() };
}

// ── Admin: fetch ALL complaints ───────────────────────────────────────────────
export async function fetchAllComplaints({ status, category, priority, search } = {}) {
  let q = query(collection(db, 'complaints'), orderBy('createdAt', 'desc'), limit(200));
  const snap = await getDocs(q);
  let results = snap.docs.map(d => ({ id: d.id, ...d.data() }));

  if (status && status !== 'all')    results = results.filter(r => r.status === status);
  if (category && category !== 'all') results = results.filter(r => r.category === category);
  if (priority && priority !== 'all') results = results.filter(r => r.priority === priority);
  if (search) {
    const s = search.toLowerCase();
    results = results.filter(r =>
      r.token?.toLowerCase().includes(s) ||
      r.title?.toLowerCase().includes(s) ||
      r.address?.toLowerCase().includes(s) ||
      r.userName?.toLowerCase().includes(s) ||
      r.userEmail?.toLowerCase().includes(s)
    );
  }
  return results;
}

// ── Admin: update complaint ───────────────────────────────────────────────────
export async function adminUpdateComplaint(complaintId, updates, note, adminId, adminName) {
  const batch = writeBatch(db);
  const ref = doc(db, 'complaints', complaintId);

  batch.update(ref, { ...updates, updatedAt: serverTimestamp() });

  if (updates.status || note) {
    const histRef = doc(collection(db, 'complaints', complaintId, 'statusHistory'));
    batch.set(histRef, {
      status:        updates.status || '',
      note:          note || '',
      updatedBy:     adminId,
      updatedByName: adminName || 'Admin',
      createdAt:     serverTimestamp(),
    });
  }

  await batch.commit();
}

// ── Admin: fetch stats ────────────────────────────────────────────────────────
export async function fetchStats() {
  const snap = await getDocs(collection(db, 'complaints'));
  const stats = { total: 0, submitted: 0, acknowledged: 0, inProgress: 0, resolved: 0, critical: 0, highCitizen: 0 };
  snap.docs.forEach(d => {
    const data = d.data();
    stats.total++;
    if (data.status === 'Submitted')    stats.submitted++;
    if (data.status === 'Acknowledged') stats.acknowledged++;
    if (data.status === 'In Progress')  stats.inProgress++;
    if (data.status === 'Resolved')     stats.resolved++;
    if (data.priority === 'Critical' || data.severity === 'Critical') stats.critical++;
    if ((data.reportCount || 1) > 2)    stats.highCitizen++;
  });
  return stats;
}

// ── Realtime subscription ─────────────────────────────────────────────────────
export function subscribeToComplaint(complaintId, callback) {
  return onSnapshot(doc(db, 'complaints', complaintId), snap => {
    if (snap.exists()) callback({ id: snap.id, ...snap.data() });
  });
}
