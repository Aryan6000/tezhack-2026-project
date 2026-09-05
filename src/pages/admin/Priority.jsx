import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Loader2, AlertCircle, ArrowRight, MapPin, Users } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { fetchAllComplaints } from '../../services/complaintService';

export default function AdminPriority() {
  const { adminUser } = useAdminAuth();
  const [issues,  setIssues]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    fetchAllComplaints()
      .then(all => {
        const priority = ['Critical', 'High', 'Medium', 'Low'];
        const sorted = all
          .filter(c => c.status !== 'Resolved' && c.status !== 'Closed')
          .sort((a, b) => {
            const pa = priority.indexOf(a.severity === 'Critical' ? 'Critical' : a.priority || 'Medium');
            const pb = priority.indexOf(b.severity === 'Critical' ? 'Critical' : b.priority || 'Medium');
            if (pa !== pb) return pa - pb;
            return (b.reportCount || 1) - (a.reportCount || 1);
          });
        setIssues(sorted);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const PRIORITY_COLOR = {
    'Critical': 'bg-red-50 border-red-200 text-red-700',
    'High':     'bg-orange-50 border-orange-200 text-orange-700',
    'Medium':   'bg-amber-50 border-amber-200 text-amber-700',
    'Low':      'bg-gray-50 border-gray-200 text-gray-600',
  };

  return (
    <AdminLayout adminEmail={adminUser?.email}>
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
            <AlertTriangle size={22} className="text-red-500"/> High Priority Issues
          </h1>
          <p className="text-gray-500 text-sm mt-1">Unresolved reports sorted by severity and report count.</p>
        </div>

        {error && <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm"><AlertCircle size={15}/>{error}</div>}

        {loading ? (
          <div className="flex justify-center py-16"><Loader2 size={28} className="animate-spin text-blue-500"/></div>
        ) : issues.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center text-gray-400">
            <p>No high priority unresolved issues. Great work!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {issues.map((c, i) => {
              const level = c.severity === 'Critical' || c.priority === 'Critical' ? 'Critical'
                          : c.priority === 'High' ? 'High'
                          : c.priority === 'Medium' ? 'Medium' : 'Low';
              return (
                <div key={c.id} className={`rounded-xl border shadow-sm p-4 flex items-start justify-between gap-4 ${
                  level === 'Critical' ? 'bg-red-50 border-red-200' :
                  level === 'High'    ? 'bg-orange-50 border-orange-200' :
                  'bg-white border-gray-100'
                }`}>
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="w-7 h-7 rounded-full bg-white border border-gray-200 text-xs font-bold text-gray-600 flex items-center justify-center shrink-0 shadow-sm">
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-mono text-xs text-gray-400">{c.token}</span>
                        <span className={`px-2 py-0.5 text-xs font-bold rounded-full border ${PRIORITY_COLOR[level]}`}>{level}</span>
                        <span className="text-xs text-gray-500 bg-white border border-gray-200 px-2 py-0.5 rounded-full">{c.status}</span>
                      </div>
                      <p className="font-bold text-gray-900">{c.title}</p>
                      <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-500">
                        <span>{c.category}</span>
                        {c.address && <span className="flex items-center gap-1"><MapPin size={11}/>{c.address}</span>}
                        {(c.reportCount || 1) > 1 && (
                          <span className="flex items-center gap-1 font-bold text-orange-600">
                            <Users size={11}/> {c.reportCount} reports
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Link to={`/admin/reports/${c.id}`}
                    className="flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700 whitespace-nowrap shrink-0">
                    View <ArrowRight size={14}/>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
