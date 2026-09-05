import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, Loader2, AlertCircle, CheckCircle2, X } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { fetchComplaintDetail, adminUpdateComplaint } from '../../services/complaintService';

const STATUS_STEPS = ['Submitted', 'Acknowledged', 'In Progress', 'Resolved', 'Closed'];
const STATUS_BADGE = {
  'Submitted':    'bg-blue-50 text-blue-700 border-blue-200',
  'Acknowledged': 'bg-purple-50 text-purple-700 border-purple-200',
  'In Progress':  'bg-amber-50 text-amber-700 border-amber-200',
  'Resolved':     'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Closed':       'bg-gray-50 text-gray-600 border-gray-200',
};

export default function AdminReportDetails() {
  const { id } = useParams();
  const { adminUser } = useAdminAuth();
  const [complaint, setComplaint] = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState('');
  const [saving,    setSaving]    = useState(false);
  const [saved,     setSaved]     = useState(false);

  // Edit state
  const [status,   setStatus]   = useState('');
  const [priority, setPriority] = useState('');
  const [severity, setSeverity] = useState('');
  const [dept,     setDept]     = useState('');
  const [note,     setNote]     = useState('');

  async function load() {
    setLoading(true); setError('');
    try {
      const d = await fetchComplaintDetail(id);
      setComplaint(d);
      setStatus(d.status || 'Submitted');
      setPriority(d.priority || 'Medium');
      setSeverity(d.severity || 'Moderate');
      setDept(d.department || '');
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, [id]);

  async function handleSave() {
    setSaving(true); setError('');
    try {
      await adminUpdateComplaint(id, { status, priority, severity, department: dept }, note, adminUser?.uid, adminUser?.email);
      setNote('');
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      load();
    } catch (e) { setError(e.message); }
    finally { setSaving(false); }
  }

  const stepIndex = complaint ? STATUS_STEPS.indexOf(complaint.status) : -1;

  return (
    <AdminLayout adminEmail={adminUser?.email}>
      <div className="space-y-5">

        {/* Back */}
        <Link to="/admin/reports" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-800">
          <ArrowLeft size={16} /> Back to Reports
        </Link>

        {error && <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm"><AlertCircle size={15}/>{error}</div>}
        {saved  && <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm"><CheckCircle2 size={15}/> Saved successfully.</div>}

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 size={28} className="animate-spin text-blue-500"/></div>
        ) : complaint && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

            {/* Left — details */}
            <div className="lg:col-span-2 space-y-4">

              {/* Header */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="font-mono text-xs text-gray-400 mb-1">{complaint.token}</p>
                    <h1 className="text-xl font-extrabold text-gray-900">{complaint.title}</h1>
                  </div>
                  <span className={`px-3 py-1.5 text-sm font-bold rounded-full border whitespace-nowrap ${STATUS_BADGE[complaint.status] || STATUS_BADGE['Submitted']}`}>
                    {complaint.status}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{complaint.description}</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-gray-400">Category:</span> <span className="font-semibold text-gray-800 ml-1">{complaint.category}</span></div>
                  <div><span className="text-gray-400">Sub-type:</span> <span className="font-semibold text-gray-800 ml-1">{complaint.subCategory || '—'}</span></div>
                  <div><span className="text-gray-400">Severity:</span> <span className="font-semibold text-gray-800 ml-1">{complaint.severity}</span></div>
                  <div><span className="text-gray-400">Priority:</span> <span className="font-semibold text-gray-800 ml-1">{complaint.priority || 'Medium'}</span></div>
                  <div><span className="text-gray-400">Department:</span> <span className="font-semibold text-gray-800 ml-1">{complaint.department || '—'}</span></div>
                  <div><span className="text-gray-400">Submitted:</span> <span className="font-semibold text-gray-800 ml-1">{complaint.createdAt?.toDate ? complaint.createdAt.toDate().toLocaleDateString('en-IN') : '—'}</span></div>
                  {(complaint.address || complaint.ward) && (
                    <div className="col-span-2 flex items-start gap-1.5">
                      <MapPin size={14} className="text-gray-400 mt-0.5 shrink-0"/>
                      <span className="text-gray-700">{complaint.address || complaint.ward}</span>
                    </div>
                  )}
                  {complaint.lat && <div className="col-span-2 text-xs text-gray-400">GPS: {complaint.lat?.toFixed(5)}, {complaint.lng?.toFixed(5)}</div>}
                </div>
                {(complaint.reportCount || 1) > 1 && (
                  <div className="mt-4 flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-lg px-3 py-2 text-sm text-orange-700 font-semibold">
                    <Users size={15}/> {complaint.reportCount} citizens have reported this issue
                  </div>
                )}
              </div>

              {/* Citizen info */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                <p className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-3">Citizen Information (Admin Only)</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="text-blue-600">Name:</span> <span className="font-semibold text-blue-900 ml-1">{complaint.anonymous ? 'Anonymous' : (complaint.userName || 'N/A')}</span></div>
                  <div><span className="text-blue-600">Email:</span> <span className="font-semibold text-blue-900 ml-1">{complaint.userEmail || 'N/A'}</span></div>
                  <div><span className="text-blue-600">Phone:</span> <span className="font-semibold text-blue-900 ml-1">{complaint.userPhone || 'N/A'}</span></div>
                  <div><span className="text-blue-600">Anonymous:</span> <span className="font-semibold text-blue-900 ml-1">{complaint.anonymous ? 'Yes' : 'No'}</span></div>
                </div>
              </div>

              {/* Photo */}
              {complaint.photoURL && (
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <img src={complaint.photoURL} alt="Evidence" className="w-full max-h-64 object-cover"/>
                  <div className="px-4 py-2 border-t border-gray-100">
                    <a href={complaint.photoURL} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline">View full size →</a>
                  </div>
                </div>
              )}

              {/* Timeline */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-gray-900 mb-4">Status Timeline</h3>
                {/* Steps */}
                <div className="flex items-center mb-6 overflow-x-auto pb-2">
                  {STATUS_STEPS.map((step, i) => {
                    const done   = i <= stepIndex;
                    const active = i === stepIndex;
                    return (
                      <div key={step} className="flex items-center shrink-0">
                        <div className="flex flex-col items-center">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                            done && !active ? 'bg-emerald-500 border-emerald-500 text-white' :
                            active          ? 'bg-blue-600 border-blue-600 text-white' :
                                              'bg-gray-100 border-gray-200 text-gray-400'
                          }`}>
                            {done && !active ? <CheckCircle2 size={14}/> : i+1}
                          </div>
                          <span className={`text-[10px] font-semibold mt-1 whitespace-nowrap ${active ? 'text-blue-600' : done && !active ? 'text-emerald-600' : 'text-gray-400'}`}>{step}</span>
                        </div>
                        {i < STATUS_STEPS.length - 1 && (
                          <div className={`w-8 h-0.5 mx-1 ${i < stepIndex ? 'bg-emerald-400' : 'bg-gray-200'}`}/>
                        )}
                      </div>
                    );
                  })}
                </div>
                {/* History entries */}
                {complaint.statusHistory?.length > 0 ? (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {[...complaint.statusHistory].reverse().map(h => (
                      <div key={h.id} className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5">
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${STATUS_BADGE[h.status] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>{h.status}</span>
                          <span className="text-xs text-gray-400">
                            {h.createdAt?.toDate ? h.createdAt.toDate().toLocaleString('en-IN', {day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}) : ''}
                          </span>
                        </div>
                        {h.note && <p className="text-sm text-gray-700">{h.note}</p>}
                        <p className="text-xs text-gray-400 mt-0.5">by {h.updatedByName || h.updatedBy || 'Admin'}</p>
                      </div>
                    ))}
                  </div>
                ) : <p className="text-gray-400 text-sm">No history yet.</p>}
              </div>
            </div>

            {/* Right — admin actions */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 sticky top-4">
                <h3 className="font-bold text-gray-900 mb-4">Admin Actions</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Status',     val: status,   set: setStatus,   opts: ['Submitted','Acknowledged','In Progress','Resolved','Closed'] },
                    { label: 'Priority',   val: priority, set: setPriority, opts: ['Low','Medium','High','Critical'] },
                    { label: 'Severity',   val: severity, set: setSeverity, opts: ['Minor','Moderate','Critical'] },
                  ].map(({ label, val, set, opts }) => (
                    <div key={label}>
                      <label className="block text-xs font-bold text-gray-600 mb-1">{label}</label>
                      <select value={val} onChange={e => set(e.target.value)}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500">
                        {opts.map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Department</label>
                    <input value={dept} onChange={e => setDept(e.target.value)} placeholder="e.g. Roads Department"
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"/>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Update Note</label>
                    <textarea value={note} onChange={e => setNote(e.target.value)} rows={3}
                      placeholder="Add a note for the status timeline…"
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"/>
                  </div>
                  <button onClick={handleSave} disabled={saving}
                    className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 disabled:opacity-60 flex items-center justify-center gap-2">
                    {saving && <Loader2 size={14} className="animate-spin"/>}
                    Save Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
