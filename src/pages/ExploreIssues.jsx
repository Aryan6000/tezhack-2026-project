import { useState, useEffect } from 'react';
import { Search, MapPin, ArrowRight, Users, Loader2, AlertCircle } from 'lucide-react';
import Dropdown from '../components/Dropdown';
import { fetchPublicComplaints } from '../services/complaintService';

const CATEGORY_OPTS = [
  { id: 'all',    label: 'All Categories' },
  { id: 'Roads & Potholes',        label: 'Roads & Potholes' },
  { id: 'Waste Management',         label: 'Waste Management' },
  { id: 'Water Supply & Drainage',  label: 'Water Supply & Drainage' },
  { id: 'Street Lighting & Power',  label: 'Street Lighting & Power' },
  { id: 'Public Parks & Trees',     label: 'Public Parks & Trees' },
  { id: 'Pollution & Noise',        label: 'Pollution & Noise' },
  { id: 'Others',                   label: 'Others' },
];

const STATUS_OPTS = [
  { id: 'all',         label: 'All Statuses' },
  { id: 'Submitted',   label: 'Submitted' },
  { id: 'Acknowledged',label: 'Acknowledged' },
  { id: 'In Progress', label: 'In Progress' },
  { id: 'Resolved',    label: 'Resolved' },
];

const STATUS_STYLE = {
  'Submitted':    { badge: 'bg-blue-50 text-blue-700 border-blue-200',    dot: 'bg-blue-500' },
  'Acknowledged': { badge: 'bg-purple-50 text-purple-700 border-purple-200', dot: 'bg-purple-500' },
  'In Progress':  { badge: 'bg-orange-50 text-orange-700 border-orange-200', dot: 'bg-orange-500' },
  'Resolved':     { badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
  'Closed':       { badge: 'bg-gray-50 text-gray-600 border-gray-200',    dot: 'bg-gray-400' },
};

const StatusBadge = ({ status }) => {
  const s = STATUS_STYLE[status] || STATUS_STYLE['Submitted'];
  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-md border flex items-center gap-1.5 w-fit ${s.badge}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
};

export default function ExploreIssues() {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORY_OPTS[0]);
  const [selectedStatus,   setSelectedStatus]   = useState(STATUS_OPTS[0]);
  const [searchQuery,      setSearchQuery]      = useState('');
  const [issues,           setIssues]           = useState([]);
  const [loading,          setLoading]          = useState(true);
  const [error,            setError]            = useState('');

  useEffect(() => {
    load();
  }, [selectedCategory]);

  async function load() {
    setLoading(true);
    setError('');
    try {
      const data = await fetchPublicComplaints({
        category: selectedCategory.id,
        status:   selectedStatus.id,
        search:   searchQuery,
      });
      setIssues(data);
    } catch (err) {
      setError(err.message || 'Failed to load issues.');
    } finally {
      setLoading(false);
    }
  }

  // Client-side filter for status + search (instant)
  const filtered = issues.filter(issue => {
    const matchStatus = selectedStatus.id === 'all' || issue.status === selectedStatus.id;
    const matchSearch = !searchQuery ||
      issue.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.token?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.address?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">Public Issue Tracker</h1>
            <p className="text-gray-600 text-lg">Browse, filter, and track public municipal issues reported across city wards in real time.</p>
          </div>
          <a href="/report" className="hidden md:flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shrink-0">
            <span className="text-lg leading-none">+</span> Report Issue
          </a>
        </div>

        {/* Filters */}
        <div className="bg-white p-2 rounded-xl border border-gray-200 shadow-sm mb-10 flex flex-col lg:flex-row gap-2">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="text-gray-400" size={18} />
            </div>
            <input
              type="text"
              placeholder="Search issues by keyword, landmark, or token ID..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="block w-full h-full min-h-[48px] pl-11 pr-4 bg-gray-50/50 border-0 text-gray-900 rounded-lg focus:ring-0 placeholder:text-gray-500"
            />
          </div>
          <div className="h-px w-full lg:h-8 lg:w-px bg-gray-200 self-center hidden lg:block" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:flex lg:w-auto">
            <div className="w-full lg:w-52">
              <Dropdown options={CATEGORY_OPTS} value={selectedCategory} onChange={(v) => { setSelectedCategory(v); }} />
            </div>
            <div className="w-full lg:w-44">
              <Dropdown options={STATUS_OPTS} value={selectedStatus} onChange={setSelectedStatus} />
            </div>
          </div>
        </div>

        {/* Feed Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-900">Public Grievances Feed</h2>
            {!loading && (
              <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold px-2 py-0.5 rounded-md">
                {filtered.length} issues
              </span>
            )}
          </div>
        </div>

        {/* States */}
        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-5 py-4 mb-6 text-red-700 text-sm">
            <AlertCircle size={18} className="shrink-0" /> {error}
            <button onClick={load} className="ml-auto font-semibold underline">Retry</button>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-blue-500" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <MapPin size={40} className="mx-auto mb-3 opacity-40" />
            <p className="font-semibold text-gray-500">No issues found</p>
            <p className="text-sm mt-1">Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filtered.map(issue => (
              <div key={issue.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col h-full">

                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-semibold text-gray-500 tracking-wide font-mono">{issue.token}</span>
                  <StatusBadge status={issue.status} />
                </div>

                <h3 className="font-bold text-gray-900 text-base leading-snug mb-2">{issue.title}</h3>

                {issue.photoURL && (
                  <img src={issue.photoURL} alt="Issue" className="w-full h-32 object-cover rounded-lg mb-3" />
                )}

                <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-3">{issue.description}</p>

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <MapPin size={14} className="text-gray-400 shrink-0" />
                  <span className="truncate">{issue.address || issue.ward || 'Location not specified'}</span>
                </div>

                {(issue.reportCount || 1) > 1 && (
                  <div className="flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-1.5 mb-3">
                    <Users size={13} />
                    <span className="font-semibold">{issue.reportCount} people reported this issue</span>
                  </div>
                )}

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-auto">
                  <span className="text-xs text-gray-400 capitalize">{issue.category}</span>
                  <span className="flex items-center gap-1 text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors">
                    {issue.status === 'Resolved' ? 'View Audit' : 'View Details'} <ArrowRight size={15} />
                  </span>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="bg-slate-900 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/3" />
          <div className="relative z-10 text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-2">Have a new civic grievance to report?</h3>
            <p className="text-slate-300">Submit in under 2 minutes with automated geolocation and photo upload.</p>
          </div>
          <a href="/report" className="relative z-10 bg-white text-slate-900 px-6 py-3 rounded-lg font-bold shadow-sm hover:bg-gray-50 transition-colors whitespace-nowrap">
            File New Report
          </a>
        </div>

      </div>
    </div>
  );
}
