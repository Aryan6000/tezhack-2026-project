import { useState, useEffect } from 'react';
import { Building2, Loader2 } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { fetchAllComplaints } from '../../services/complaintService';

const DEPARTMENTS = [
  'Roads & Potholes', 'Street Lights', 'Water Supply', 'Drainage & Sewage',
  'Garbage & Sanitation', 'Traffic & Road Safety', 'Parks & Public Spaces',
  'Public Facilities', 'Electricity', 'Others',
];

export default function AdminDepartments() {
  const { adminUser } = useAdminAuth();
  const [stats,   setStats]   = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllComplaints()
      .then(all => {
        const s = {};
        DEPARTMENTS.forEach(d => { s[d] = { total: 0, resolved: 0, inProgress: 0 }; });
        all.forEach(c => {
          const dept = c.department || 'Others';
          if (!s[dept]) s[dept] = { total: 0, resolved: 0, inProgress: 0 };
          s[dept].total++;
          if (c.status === 'Resolved') s[dept].resolved++;
          if (c.status === 'In Progress') s[dept].inProgress++;
        });
        setStats(s);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout adminEmail={adminUser?.email}>
      <div className="space-y-5">
        <h1 className="text-2xl font-extrabold text-gray-900">Departments</h1>

        {loading ? (
          <div className="flex justify-center py-16"><Loader2 size={28} className="animate-spin text-blue-500"/></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DEPARTMENTS.map(dept => {
              const s = stats[dept] || { total: 0, resolved: 0, inProgress: 0 };
              const rate = s.total > 0 ? Math.round((s.resolved / s.total) * 100) : 0;
              return (
                <div key={dept} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                      <Building2 size={18} className="text-blue-600"/>
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm">{dept}</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center mb-3">
                    <div>
                      <p className="text-xl font-extrabold text-gray-900">{s.total}</p>
                      <p className="text-[10px] font-semibold text-gray-400 uppercase">Total</p>
                    </div>
                    <div>
                      <p className="text-xl font-extrabold text-amber-600">{s.inProgress}</p>
                      <p className="text-[10px] font-semibold text-gray-400 uppercase">Active</p>
                    </div>
                    <div>
                      <p className="text-xl font-extrabold text-emerald-600">{s.resolved}</p>
                      <p className="text-[10px] font-semibold text-gray-400 uppercase">Resolved</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">Resolution rate</span>
                      <span className="font-bold text-gray-700">{rate}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${rate}%` }}/>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
