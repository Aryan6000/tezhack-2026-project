import { useState, useEffect } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { fetchAllComplaints } from '../../services/complaintService';

function BarRow({ label, count, total, color }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="font-bold text-gray-900">{count} <span className="text-gray-400 font-normal text-xs">({pct}%)</span></span>
      </div>
      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all duration-700`} style={{ width: `${pct}%` }}/>
      </div>
    </div>
  );
}

export default function AdminAnalytics() {
  const { adminUser } = useAdminAuth();
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    fetchAllComplaints()
      .then(all => {
        const total = all.length;
        const byStatus   = {};
        const byCat      = {};
        const bySeverity = {};
        const byPriority = {};
        let duplicates = 0;

        all.forEach(c => {
          byStatus[c.status]         = (byStatus[c.status] || 0) + 1;
          byCat[c.category]          = (byCat[c.category] || 0) + 1;
          bySeverity[c.severity]     = (bySeverity[c.severity] || 0) + 1;
          byPriority[c.priority || 'Medium'] = (byPriority[c.priority || 'Medium'] || 0) + 1;
          if ((c.reportCount || 1) > 1) duplicates++;
        });

        setData({ total, byStatus, byCat, bySeverity, byPriority, duplicates });
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const STATUS_COLORS = {
    'Submitted':'bg-blue-500','Acknowledged':'bg-purple-500','In Progress':'bg-amber-500',
    'Resolved':'bg-emerald-500','Closed':'bg-gray-400',
  };
  const CAT_COLOR = 'bg-blue-400';
  const SEV_COLORS = { 'Minor':'bg-green-400','Moderate':'bg-amber-400','Critical':'bg-red-500' };
  const PRI_COLORS = { 'Low':'bg-gray-400','Medium':'bg-amber-400','High':'bg-orange-500','Critical':'bg-red-500' };

  return (
    <AdminLayout adminEmail={adminUser?.email}>
      <div className="space-y-5">
        <h1 className="text-2xl font-extrabold text-gray-900">Analytics</h1>

        {error && <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm"><AlertCircle size={15}/>{error}</div>}

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 size={28} className="animate-spin text-blue-500"/></div>
        ) : data && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Status */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-bold text-gray-900 mb-4">Reports by Status</h2>
              <div className="space-y-3">
                {Object.entries(data.byStatus).map(([k, v]) => (
                  <BarRow key={k} label={k} count={v} total={data.total} color={STATUS_COLORS[k] || 'bg-gray-400'}/>
                ))}
              </div>
            </div>

            {/* Category */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-bold text-gray-900 mb-4">Reports by Category</h2>
              <div className="space-y-3">
                {Object.entries(data.byCat).sort((a,b)=>b[1]-a[1]).map(([k, v]) => (
                  <BarRow key={k} label={k} count={v} total={data.total} color={CAT_COLOR}/>
                ))}
              </div>
            </div>

            {/* Severity */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-bold text-gray-900 mb-4">Reports by Severity</h2>
              <div className="space-y-3">
                {Object.entries(data.bySeverity).map(([k, v]) => (
                  <BarRow key={k} label={k} count={v} total={data.total} color={SEV_COLORS[k] || 'bg-gray-400'}/>
                ))}
              </div>
            </div>

            {/* Priority */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-bold text-gray-900 mb-4">Reports by Priority</h2>
              <div className="space-y-3">
                {Object.entries(data.byPriority).map(([k, v]) => (
                  <BarRow key={k} label={k} count={v} total={data.total} color={PRI_COLORS[k] || 'bg-gray-400'}/>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="md:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-bold text-gray-900 mb-4">Summary</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                {[
                  { label: 'Total Reports',    value: data.total },
                  { label: 'Resolved',         value: data.byStatus['Resolved'] || 0 },
                  { label: 'Resolution Rate',  value: `${data.total > 0 ? Math.round(((data.byStatus['Resolved']||0)/data.total)*100) : 0}%` },
                  { label: 'Duplicate Issues', value: data.duplicates },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <p className="text-2xl font-extrabold text-gray-900">{value}</p>
                    <p className="text-xs font-semibold text-gray-500 mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
