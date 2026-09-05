import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Loader2, AlertCircle, ArrowRight, Flame } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { fetchAllComplaints } from '../../services/complaintService';

export default function AdminDuplicates() {
  const { adminUser } = useAdminAuth();
  const [groups,  setGroups]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    fetchAllComplaints()
      .then(all => {
        // Group by duplicateGroupId or show complaints with reportCount > 1
        const hot = all
          .filter(c => (c.reportCount || 1) > 1)
          .sort((a, b) => (b.reportCount || 1) - (a.reportCount || 1));
        setGroups(hot);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const STATUS_BADGE = {
    'Submitted':    'bg-blue-50 text-blue-700 border-blue-200',
    'In Progress':  'bg-amber-50 text-amber-700 border-amber-200',
    'Resolved':     'bg-emerald-50 text-emerald-700 border-emerald-200',
  };

  return (
    <AdminLayout adminEmail={adminUser?.email}>
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Duplicate & Similar Issues</h1>
          <p className="text-gray-500 text-sm mt-1">Issues reported by multiple citizens about the same problem.</p>
        </div>

        {error && <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm"><AlertCircle size={15}/>{error}</div>}

        {loading ? (
          <div className="flex justify-center py-16"><Loader2 size={28} className="animate-spin text-blue-500"/></div>
        ) : groups.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center text-gray-400">
            <Users size={40} className="mx-auto mb-3 opacity-30"/>
            <p className="font-semibold">No duplicate issues found yet.</p>
            <p className="text-sm mt-1">When multiple citizens report the same issue, they'll appear here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {groups.map((c, i) => (
              <div key={c.id} className="bg-white rounded-xl border border-orange-100 shadow-sm p-5 flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 min-w-0">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
                    <Flame size={20} className="text-orange-500"/>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-mono text-xs text-gray-400">{c.token}</span>
                      <span className={`px-2 py-0.5 text-xs font-bold rounded-full border ${STATUS_BADGE[c.status] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>{c.status}</span>
                    </div>
                    <h3 className="font-bold text-gray-900">{c.title}</h3>
                    <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1 font-bold text-orange-600">
                        <Users size={12}/> {c.reportCount} citizens reported
                      </span>
                      <span>{c.category}</span>
                      {c.address && <span>{c.address}</span>}
                      <span>Priority: {c.priority || 'Medium'}</span>
                    </div>
                  </div>
                </div>
                <Link to={`/admin/reports/${c.id}`}
                  className="flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700 whitespace-nowrap shrink-0">
                  View <ArrowRight size={14}/>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
