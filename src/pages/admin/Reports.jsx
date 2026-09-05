import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Users, Loader2, AlertCircle, ArrowRight, RefreshCw } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { fetchAllComplaints } from '../../services/complaintService';

const STATUS_BADGE = {
  'Submitted':    'bg-blue-50 text-blue-700 border-blue-200',
  'Acknowledged': 'bg-purple-50 text-purple-700 border-purple-200',
  'In Progress':  'bg-amber-50 text-amber-700 border-amber-200',
  'Resolved':     'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Closed':       'bg-gray-50 text-gray-600 border-gray-200',
};
const PRIORITY_BADGE = {
  'Low':      'text-gray-600 bg-gray-50 border-gray-200',
  'Medium':   'text-amber-700 bg-amber-50 border-amber-200',
  'High':     'text-orange-700 bg-orange-50 border-orange-200',
  'Critical': 'text-red-700 bg-red-50 border-red-200',
};

export default function AdminReports() {
  const { adminUser } = useAdminAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState('');
  const [search,     setSearch]     = useState('');
  const [fStatus,    setFStatus]    = useState('all');
  const [fCat,       setFCat]       = useState('all');
  const [fPri,       setFPri]       = useState('all');

  async function load() {
    setLoading(true); setError('');
    try { setComplaints(await fetchAllComplaints()); }
    catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  const filtered = complaints.filter(c => {
    const s = search.toLowerCase();
    return (
      (!search || c.token?.toLowerCase().includes(s) || c.title?.toLowerCase().includes(s) || c.address?.toLowerCase().includes(s) || c.userEmail?.toLowerCase().includes(s)) &&
      (fStatus === 'all' || c.status === fStatus) &&
      (fCat === 'all' || c.category === fCat) &&
      (fPri === 'all' || c.priority === fPri)
    );
  });

  return (
    <AdminLayout adminEmail={adminUser?.email}>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold text-gray-900">All Reports</h1>
          <button onClick={load} className="flex items-center gap-2 text-sm font-medium border border-gray-200 bg-white px-3 py-2 rounded-lg hover:bg-gray-50">
            <RefreshCw size={14} /> Refresh
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 flex flex-wrap gap-3">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search token, title, email, address…"
              className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:bg-white" />
          </div>
          {[
            { val: fStatus, set: setFStatus, opts: ['all','Submitted','Acknowledged','In Progress','Resolved','Closed'], label: 'Status' },
            { val: fCat,    set: setFCat,    opts: ['all','Roads & Potholes','Waste Management','Water Supply & Drainage','Street Lighting & Power','Public Parks & Trees','Pollution & Noise','Others'], label: 'Category' },
            { val: fPri,    set: setFPri,    opts: ['all','Low','Medium','High','Critical'], label: 'Priority' },
          ].map(({ val, set, opts, label }) => (
            <select key={label} value={val} onChange={e => set(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500">
              {opts.map(o => <option key={o} value={o}>{o === 'all' ? `All ${label}` : o}</option>)}
            </select>
          ))}
          <span className="px-3 py-2 bg-blue-50 text-blue-700 font-bold text-sm rounded-lg border border-blue-100">
            {filtered.length} results
          </span>
        </div>

        {error && <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm"><AlertCircle size={15}/>{error}</div>}

        {loading ? (
          <div className="flex justify-center py-16"><Loader2 size={28} className="animate-spin text-blue-500"/></div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {['Token','Title / Citizen','Category','Location','Priority','Status','Reports','Date',''].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.length === 0 ? (
                    <tr><td colSpan={9} className="px-4 py-12 text-center text-gray-400">No reports found.</td></tr>
                  ) : filtered.map(c => (
                    <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs font-bold text-gray-500 whitespace-nowrap">{c.token}</td>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-gray-900 truncate max-w-[160px]">{c.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5 truncate max-w-[160px]">{c.anonymous ? 'Anonymous' : (c.userName || c.userEmail || '—')}</p>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{c.category}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-gray-500 flex items-center gap-1 max-w-[120px] truncate">
                          <MapPin size={11} className="shrink-0"/>{c.address || c.ward || '—'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 text-xs font-bold rounded-full border ${PRIORITY_BADGE[c.priority] || PRIORITY_BADGE['Medium']}`}>
                          {c.priority || 'Medium'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${STATUS_BADGE[c.status] || STATUS_BADGE['Submitted']}`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {(c.reportCount || 1) > 1
                          ? <span className="text-xs font-bold text-orange-600 flex items-center gap-1"><Users size={11}/>{c.reportCount}</span>
                          : <span className="text-xs text-gray-400">1</span>}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">
                        {c.createdAt?.toDate ? c.createdAt.toDate().toLocaleDateString('en-IN', { day:'numeric', month:'short' }) : '—'}
                      </td>
                      <td className="px-4 py-3">
                        <Link to={`/admin/reports/${c.id}`}
                          className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 whitespace-nowrap">
                          View <ArrowRight size={12}/>
                        </Link>
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
