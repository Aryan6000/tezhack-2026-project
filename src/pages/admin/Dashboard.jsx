import { useState, useEffect } from 'react';
import { Search, Loader2, AlertCircle, CheckCircle2, Clock, Users, BarChart3, X, MapPin, RefreshCw } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { fetchAllComplaints, fetchStats, adminUpdateComplaint, fetchComplaintDetail } from '../../services/complaintService';

// ─── Status badge ─────────────────────────────────────────────────────────────
const STATUS_STYLES = {
  'Submitted':    'bg-blue-50 text-blue-700 border-blue-200',
  'Acknowledged': 'bg-purple-50 text-purple-700 border-purple-200',
  'In Progress':  'bg-amber-50 text-amber-700 border-amber-200',
  'Resolved':     'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Closed':       'bg-gray-50 text-gray-600 border-gray-200',
};
const StatusBadge = ({ status }) => (
  <span className={`px-2.5 py-1 text-xs font-bold rounded-full border capitalize ${STATUS_STYLES[status] || STATUS_STYLES['Submitted']}`}>
    {status}
  </span>
);

const PRIORITY_STYLES = {
  'Low':      'text-gray-600 bg-gray-50 border-gray-200',
  'Medium':   'text-amber-700 bg-amber-50 border-amber-200',
  'High':     'text-orange-700 bg-orange-50 border-orange-200',
  'Critical': 'text-red-700 bg-red-50 border-red-200',
};

// ─── Stat card ────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, color, icon: Icon }) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</span>
      <div className={`p-1.5 rounded-lg ${color}`}><Icon size={15} className="text-white" /></div>
    </div>
    <div className="text-2xl font-extrabold text-gray-900">{value ?? '—'}</div>
  </div>
);

// ─── Update Modal ─────────────────────────────────────────────────────────────
function UpdateModal({ complaint, onClose, onSaved, adminId, adminName }) {
  const [status,   setStatus]   = useState(complaint.status || 'Submitted');
  const [priority, setPriority] = useState(complaint.priority || 'Medium');
  const [severity, setSeverity] = useState(complaint.severity || 'Moderate');
  const [dept,     setDept]     = useState(complaint.department || '');
  const [note,     setNote]     = useState('');
  const [saving,   setSaving]   = useState(false);
  const [error,    setError]    = useState('');

  async function save() {
    setSaving(true); setError('');
    try {
      await adminUpdateComplaint(
        complaint.id,
        { status, priority, severity, department: dept },
        note,
        adminId, adminName
      );
      onSaved();
      onClose();
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-4">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Complaint Details</h3>
            <p className="text-xs text-gray-500 font-mono mt-0.5">{complaint.token}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"><X size={18} /></button>
        </div>

        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">

          {/* Citizen info (admin only) */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm space-y-1">
            <p className="font-bold text-blue-900 text-xs uppercase tracking-wider mb-2">Citizen Information</p>
            <p><span className="font-semibold text-blue-800">Name:</span> <span className="text-blue-700">{complaint.anonymous ? 'Anonymous' : (complaint.userName || 'N/A')}</span></p>
            <p><span className="font-semibold text-blue-800">Email:</span> <span className="text-blue-700">{complaint.userEmail || 'N/A'}</span></p>
            <p><span className="font-semibold text-blue-800">Phone:</span> <span className="text-blue-700">{complaint.userPhone || 'N/A'}</span></p>
            <p><span className="font-semibold text-blue-800">User ID:</span> <span className="text-blue-700 font-mono text-xs">{complaint.userId}</span></p>
          </div>

          {/* Complaint details */}
          <div>
            <h4 className="font-bold text-gray-900 mb-1">{complaint.title}</h4>
            <p className="text-sm text-gray-600 mb-3">{complaint.description}</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-gray-500">Category:</span> <span className="font-medium">{complaint.category}</span></div>
              <div><span className="text-gray-500">Sub-type:</span> <span className="font-medium">{complaint.subCategory || '—'}</span></div>
              {(complaint.address || complaint.ward) && (
                <div className="col-span-2 flex items-start gap-1.5 text-gray-600">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-gray-400" />
                  {complaint.address || complaint.ward}
                </div>
              )}
              {complaint.lat && <div className="col-span-2 text-xs text-gray-400">GPS: {complaint.lat?.toFixed(5)}, {complaint.lng?.toFixed(5)}</div>}
              {(complaint.reportCount || 1) > 1 && (
                <div className="col-span-2 flex items-center gap-1.5 text-amber-700 font-semibold text-sm">
                  <Users size={14} /> {complaint.reportCount} citizens reported this
                </div>
              )}
            </div>
          </div>

          {complaint.photoURL && (
            <img src={complaint.photoURL} alt="Evidence" className="w-full h-48 object-cover rounded-xl border border-gray-200" />
          )}

          {/* Admin controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Status</label>
              <select value={status} onChange={e => setStatus(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 bg-white">
                {['Submitted','Acknowledged','In Progress','Resolved','Closed'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Priority</label>
              <select value={priority} onChange={e => setPriority(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 bg-white">
                {['Low','Medium','High','Critical'].map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Severity</label>
              <select value={severity} onChange={e => setSeverity(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 bg-white">
                {['Minor','Moderate','Critical'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Department</label>
              <input value={dept} onChange={e => setDept(e.target.value)} placeholder="e.g. Roads Department"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Admin Note / Update</label>
            <textarea value={note} onChange={e => setNote(e.target.value)} rows={3}
              placeholder="Add a status update note visible in the timeline…"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
          </div>

          {/* Status history */}
          {complaint.statusHistory?.length > 0 && (
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Status History</p>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {[...complaint.statusHistory].reverse().map(h => (
                  <div key={h.id} className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5 text-xs">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className={`font-bold px-2 py-0.5 rounded-full border text-[11px] ${STATUS_STYLES[h.status] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>{h.status}</span>
                      <span className="text-gray-400">
                        {h.createdAt?.toDate ? h.createdAt.toDate().toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : ''}
                      </span>
                    </div>
                    {h.note && <p className="text-gray-600 mt-1">{h.note}</p>}
                    <p className="text-gray-400 mt-0.5">by {h.updatedByName || 'Admin'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && <p className="text-red-600 text-sm flex items-center gap-2"><AlertCircle size={14}/>{error}</p>}
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50">Cancel</button>
          <button onClick={save} disabled={saving}
            className="px-6 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 disabled:opacity-60 flex items-center gap-2">
            {saving && <Loader2 size={14} className="animate-spin" />}
            Save Update
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const { adminUser, loading: authLoading } = useAdminAuth();

  const [complaints, setComplaints] = useState([]);
  const [stats,      setStats]      = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState('');

  const [search,   setSearch]   = useState('');
  const [fStatus,  setFStatus]  = useState('all');
  const [fCat,     setFCat]     = useState('all');
  const [fPri,     setFPri]     = useState('all');

  const [selected, setSelected] = useState(null); // complaint for modal

  async function loadAll() {
    setLoading(true); setError('');
    try {
      const [data, s] = await Promise.all([fetchAllComplaints(), fetchStats()]);
      setComplaints(data);
      setStats(s);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }

  useEffect(() => {
    loadAll();
  }, []);

  async function openDetail(c) {
    const detail = await fetchComplaintDetail(c.id);
    setSelected(detail);
  }

  // Filters
  const filtered = complaints.filter(c => {
    const s = search.toLowerCase();
    const matchSearch = !search ||
      c.token?.toLowerCase().includes(s) ||
      c.title?.toLowerCase().includes(s) ||
      c.address?.toLowerCase().includes(s) ||
      c.userEmail?.toLowerCase().includes(s) ||
      c.userName?.toLowerCase().includes(s);
    return matchSearch &&
      (fStatus === 'all' || c.status === fStatus) &&
      (fCat    === 'all' || c.category === fCat) &&
      (fPri    === 'all' || c.priority === fPri);
  });

  return (
    <AdminLayout adminEmail={adminUser?.email}>
      {selected && (
        <UpdateModal
          complaint={selected}
          adminId={adminUser?.uid}
          adminName={adminUser?.displayName || adminUser?.email || 'Admin'}
          onClose={() => setSelected(null)}
          onSaved={loadAll}
        />
      )}

      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 text-sm mt-0.5">Welcome, {adminUser?.displayName || adminUser?.email || 'Admin'}</p>
          </div>
          <button onClick={loadAll} className="flex items-center gap-2 text-sm font-medium text-gray-600 border border-gray-200 bg-white px-3.5 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <RefreshCw size={14} /> Refresh
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          <StatCard label="Total"        value={stats?.total}       color="bg-slate-700"   icon={BarChart3} />
          <StatCard label="Submitted"    value={stats?.submitted}   color="bg-blue-500"    icon={Clock} />
          <StatCard label="Acknowledged" value={stats?.acknowledged}color="bg-purple-500"  icon={CheckCircle2} />
          <StatCard label="In Progress"  value={stats?.inProgress}  color="bg-amber-500"   icon={Clock} />
          <StatCard label="Resolved"     value={stats?.resolved}    color="bg-emerald-500" icon={CheckCircle2} />
          <StatCard label="Critical"     value={stats?.critical}    color="bg-red-500"     icon={AlertCircle} />
          <StatCard label="Multi-Report" value={stats?.highCitizen} color="bg-rose-400"    icon={Users} />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 flex flex-wrap gap-3">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by token, title, email, address…"
              className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 bg-gray-50" />
          </div>
          <select value={fStatus} onChange={e => setFStatus(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500">
            <option value="all">All Status</option>
            {['Submitted','Acknowledged','In Progress','Resolved','Closed'].map(s => <option key={s}>{s}</option>)}
          </select>
          <select value={fCat} onChange={e => setFCat(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500">
            <option value="all">All Categories</option>
            {['Roads & Potholes','Waste Management','Water Supply & Drainage','Street Lighting & Power','Public Parks & Trees','Pollution & Noise','Others'].map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={fPri} onChange={e => setFPri(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500">
            <option value="all">All Priority</option>
            {['Low','Medium','High','Critical'].map(p => <option key={p}>{p}</option>)}
          </select>
          <span className="px-3 py-2 bg-blue-50 text-blue-700 text-sm font-bold rounded-lg border border-blue-100">
            {filtered.length} results
          </span>
        </div>

        {/* Most Reported */}
        {complaints.filter(c => (c.reportCount || 1) > 2).length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              🔥 High Citizen Reports
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {complaints.filter(c => (c.reportCount||1) > 2).sort((a,b) => (b.reportCount||1)-(a.reportCount||1)).slice(0,3).map(c => (
                <button key={c.id} onClick={() => openDetail(c)}
                  className="text-left bg-white border border-amber-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-gray-500">{c.token}</span>
                    <span className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      <Users size={11}/> {c.reportCount} reports
                    </span>
                  </div>
                  <p className="font-semibold text-gray-900 text-sm truncate">{c.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{c.status} · {c.priority || 'Medium'} Priority</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-20"><Loader2 size={32} className="animate-spin text-blue-500" /></div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {['Token','Title','Category','Location','Priority','Status','Citizens','Date','Actions'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.length === 0 ? (
                    <tr><td colSpan={9} className="px-4 py-12 text-center text-gray-400">No complaints found.</td></tr>
                  ) : filtered.map(c => (
                    <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs font-bold text-gray-600 whitespace-nowrap">{c.token}</td>
                      <td className="px-4 py-3 max-w-[180px]">
                        <p className="font-medium text-gray-900 truncate">{c.title}</p>
                        <p className="text-xs text-gray-400 truncate">{c.userName || 'Anonymous'}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap text-xs">{c.category}</td>
                      <td className="px-4 py-3 max-w-[140px]">
                        <span className="text-xs text-gray-500 truncate flex items-center gap-1">
                          <MapPin size={11} className="shrink-0"/>{c.address || c.ward || '—'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 text-xs font-bold rounded-full border whitespace-nowrap ${PRIORITY_STYLES[c.priority] || PRIORITY_STYLES['Medium']}`}>
                          {c.priority || 'Medium'}
                        </span>
                      </td>
                      <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                      <td className="px-4 py-3 text-center">
                        {(c.reportCount || 1) > 1 ? (
                          <span className="flex items-center gap-1 text-xs font-bold text-amber-700">
                            <Users size={12}/>{c.reportCount}
                          </span>
                        ) : <span className="text-xs text-gray-400">1</span>}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">
                        {c.createdAt?.toDate ? c.createdAt.toDate().toLocaleDateString('en-IN', { day:'numeric', month:'short' }) : '—'}
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => openDetail(c)}
                          className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
                          View / Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

