import { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Building, MessageSquare, Check, Clock, Loader2, AlertCircle, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { fetchMyComplaints, fetchComplaintDetail, findByToken, subscribeToComplaint } from '../services/complaintService';

const STATUS_STEPS = ['Submitted', 'Acknowledged', 'In Progress', 'Resolved'];

const StepIcon = ({ done, active }) => {
  if (done) return (
    <div className="w-6 h-6 rounded-full bg-emerald-500 border-4 border-white z-10 shrink-0 flex items-center justify-center shadow-sm">
      <Check size={12} className="text-white" strokeWidth={4} />
    </div>
  );
  if (active) return (
    <div className="w-6 h-6 rounded-full bg-blue-600 border-4 border-white z-10 shrink-0 flex items-center justify-center shadow-[0_0_0_2px_rgba(37,99,235,0.2)]">
      <div className="w-2 h-2 rounded-full bg-white" />
    </div>
  );
  return <div className="w-6 h-6 rounded-full bg-slate-300 border-4 border-white z-10 shrink-0" />;
};

export default function TrackStatus() {
  const { user } = useAuth();
  const [trackingId, setTrackingId] = useState('');
  const [complaint,  setComplaint]  = useState(null);
  const [myList,     setMyList]     = useState([]);
  const [loading,    setLoading]    = useState(false);
  const [listLoading,setListLoading]= useState(false);
  const [error,      setError]      = useState('');

  // Load citizen's own complaints on mount
  useEffect(() => {
    if (!user) return;
    setListLoading(true);
    fetchMyComplaints(user.uid)
      .then(setMyList)
      .catch(() => {})
      .finally(() => setListLoading(false));
  }, [user]);

  // Realtime subscription when a complaint is selected
  useEffect(() => {
    if (!complaint?.id) return;
    const unsub = subscribeToComplaint(complaint.id, updated => {
      setComplaint(prev => ({ ...prev, ...updated }));
    });
    return unsub;
  }, [complaint?.id]);

  async function handleTrack() {
    if (!trackingId.trim()) return;
    setLoading(true); setError('');
    try {
      const found = await findByToken(trackingId.trim());
      if (!found) { setError('No complaint found with that token. Check the format: CIV-YYYY-XXXX'); setLoading(false); return; }
      const detail = await fetchComplaintDetail(found.id);
      setComplaint(detail);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally { setLoading(false); }
  }

  async function selectComplaint(c) {
    const detail = await fetchComplaintDetail(c.id);
    setComplaint(detail);
    setTrackingId(c.token);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const stepIndex = complaint ? STATUS_STEPS.indexOf(complaint.status) : -1;

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

<<<<<<< Updated upstream
        {/* Search */}
        <section className="flex flex-col items-center gap-4 w-full max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Track Your Grievance</h1>
          <p className="text-lg text-slate-600 mb-2">Enter your tracking ID or select from your submitted complaints below.</p>
=======
        {/* Search Section */}
        <section className="flex flex-col items-center gap-4 w-full max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Track Your Grievance</h1>
          <p className="text-lg text-slate-600 mb-2">Enter your tracking ID to view the latest status updates and assigned departments.</p>

>>>>>>> Stashed changes
          <div className="flex w-full relative h-14 shadow-sm">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Search size={20} />
            </div>
            <input
              className="w-full h-full pl-12 pr-4 py-3 border border-slate-300 rounded-l-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-slate-900"
<<<<<<< Updated upstream
              placeholder="Grievance Tracking ID (e.g. CIV-2026-1234)"
=======
              placeholder="Grievance Tracking ID (e.g. #CIV-2025-8849)"
              type="text"
>>>>>>> Stashed changes
              value={trackingId}
              onChange={e => setTrackingId(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleTrack()}
            />
            <button
<<<<<<< Updated upstream
              onClick={handleTrack}
              disabled={loading}
              className="h-full px-8 bg-slate-900 text-white font-semibold rounded-r-lg hover:bg-slate-800 transition-colors whitespace-nowrap disabled:opacity-60 flex items-center gap-2"
=======
              onClick={() => setIsTracking(true)}
              className="h-full px-8 bg-slate-900 text-white font-semibold rounded-r-lg hover:bg-slate-800 transition-colors whitespace-nowrap"
>>>>>>> Stashed changes
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              Track Status
            </button>
          </div>
          {error && (
            <div className="w-full flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
              <AlertCircle size={16} className="shrink-0" /> {error}
            </div>
          )}
        </section>

<<<<<<< Updated upstream
        {/* Complaint Detail */}
        {complaint && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full mb-12">

            {/* Details Card */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(51,65,85,0.05)] p-8 border border-slate-200">
=======
        {/* Result Section */}
        {isTracking && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">

            {/* Details Card */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(51,65,85,0.05)] p-8 border border-slate-200 h-full">
>>>>>>> Stashed changes

                <div className="flex flex-wrap justify-between items-start gap-4 mb-6 border-b border-slate-100 pb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-1 leading-tight">{complaint.title}</h2>
                    <p className="text-sm font-medium text-slate-500">Token: {complaint.token}</p>
                  </div>
                  <div className={`px-3 py-1.5 rounded-full text-sm font-bold inline-flex items-center gap-1.5 shrink-0 border ${
                    complaint.status === 'Resolved'     ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    complaint.status === 'In Progress'  ? 'bg-blue-50 text-blue-700 border-blue-100' :
                    complaint.status === 'Acknowledged' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                    'bg-gray-50 text-gray-700 border-gray-200'
                  }`}>
                    <Clock size={14} /> {complaint.status}
                  </div>
                </div>

<<<<<<< Updated upstream
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
=======
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
>>>>>>> Stashed changes
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Category</span>
                    <span className="text-slate-900 font-medium">{complaint.category}{complaint.subCategory ? ` › ${complaint.subCategory}` : ''}</span>
                  </div>
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Location</span>
                    <span className="text-slate-900 flex items-center gap-2 font-medium">
                      <MapPin size={16} className="text-slate-400 shrink-0" />
                      {complaint.address || complaint.ward || 'Not specified'}
                    </span>
                  </div>
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Submitted</span>
                    <span className="text-slate-900 flex items-center gap-2 font-medium">
<<<<<<< Updated upstream
                      <Calendar size={16} className="text-slate-400 shrink-0" />
                      {complaint.createdAt?.toDate
                        ? complaint.createdAt.toDate().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                        : 'Recently'}
=======
                      <Calendar size={18} className="text-slate-400" />
                      Jan 15, 2025
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Assigned Dept</span>
                    <span className="text-slate-900 flex items-center gap-2 font-medium">
                      <Building size={18} className="text-slate-400" />
                      Public Works Dept
>>>>>>> Stashed changes
                    </span>
                  </div>
                  {complaint.department && (
                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Department</span>
                      <span className="text-slate-900 flex items-center gap-2 font-medium">
                        <Building size={16} className="text-slate-400 shrink-0" /> {complaint.department}
                      </span>
                    </div>
                  )}
                </div>

<<<<<<< Updated upstream
                {(complaint.reportCount || 1) > 1 && (
                  <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-lg px-4 py-3 mb-6 text-sm text-amber-800">
                    <Users size={16} /> <span className="font-semibold">{complaint.reportCount} citizens have reported this issue</span>
                  </div>
                )}

                {complaint.photoURL && (
                  <img src={complaint.photoURL} alt="Complaint evidence" className="w-full h-48 object-cover rounded-xl mb-6 border border-slate-200" />
                )}

                <div className="bg-slate-50 border-l-4 border-blue-500 p-5 rounded-r-lg">
=======
                {/* Citizen Note */}
                <div className="bg-slate-50 border-l-4 border-blue-500 p-5 rounded-r-lg mt-auto">
>>>>>>> Stashed changes
                  <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <MessageSquare size={16} className="text-blue-600" /> Description
                  </h3>
                  <p className="text-slate-700 text-sm leading-relaxed">{complaint.description}</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(51,65,85,0.05)] p-8 border border-slate-200 h-full">
                <h2 className="text-xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4">Resolution Timeline</h2>
<<<<<<< Updated upstream
                <div className="relative pl-2">
                  <div className="absolute left-[19px] top-[12px] bottom-[24px] w-[2px] bg-slate-200" />

                  {/* Fixed status steps */}
                  {STATUS_STEPS.map((step, i) => {
                    const done   = i < stepIndex;
                    const active = i === stepIndex;
                    const pending= i > stepIndex;
                    // Find matching history entry
                    const hist = complaint.statusHistory?.find(h => h.status === step);
                    return (
                      <div key={step} className={`relative flex gap-4 mb-8 ${pending ? 'opacity-50' : ''}`}>
                        <StepIcon done={done} active={active} />
                        <div className="flex flex-col w-full">
                          <span className={`text-base font-bold ${active ? 'text-blue-600' : done ? 'text-slate-900' : 'text-slate-600'}`}>{step}</span>
                          {hist ? (
                            <>
                              <span className="text-sm font-medium text-slate-500 mb-1">
                                {hist.createdAt?.toDate
                                  ? hist.createdAt.toDate().toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
                                  : ''}
                              </span>
                              {hist.note && (
                                <div className={`p-3 rounded-lg text-sm font-medium text-slate-800 border ${active ? 'bg-blue-50/50 border-blue-100' : 'bg-slate-50 border-slate-200'}`}>
                                  {hist.note}
                                </div>
                              )}
                            </>
                          ) : (
                            <span className="text-sm font-medium text-slate-400 italic">Pending</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
=======

                <div className="relative pl-2">
                  {/* Timeline Line */}
                  <div className="absolute left-[19px] top-[12px] bottom-[24px] w-[2px] bg-slate-200"></div>

                  {/* Step 1: Submitted */}
                  <div className="relative flex gap-4 mb-8">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 border-4 border-white z-10 shrink-0 flex items-center justify-center mt-0.5 shadow-sm">
                      <Check size={12} className="text-white" strokeWidth={4} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-base font-bold text-slate-900">Submitted</span>
                      <span className="text-sm font-medium text-slate-500 mb-1">Jan 15, 2025, 09:30 AM</span>
                    </div>
                  </div>

                  {/* Step 2: Assigned */}
                  <div className="relative flex gap-4 mb-8">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 border-4 border-white z-10 shrink-0 flex items-center justify-center mt-0.5 shadow-sm">
                      <Check size={12} className="text-white" strokeWidth={4} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-base font-bold text-slate-900">Assigned to Department</span>
                      <span className="text-sm font-medium text-slate-500 mb-2">Jan 16, 2025, 10:15 AM</span>
                      <p className="text-sm font-medium text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200">
                        Assigned to Public Works Dept
                      </p>
                    </div>
                  </div>

                  {/* Step 3: In Progress (Active) */}
                  <div className="relative flex gap-4 mb-8">
                    {/* Active Line Override */}
                    <div className="absolute left-[11px] top-[24px] bottom-[-32px] w-[2px] bg-blue-200 z-0 hidden"></div>

                    <div className="w-6 h-6 rounded-full bg-blue-600 border-4 border-white z-10 shrink-0 flex items-center justify-center mt-0.5 shadow-[0_0_0_2px_rgba(37,99,235,0.2)]">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                    <div className="flex flex-col w-full">
                      <span className="text-base font-bold text-blue-600">In Progress</span>
                      <span className="text-sm font-medium text-blue-500 mb-2">Jan 18, 2025, 02:45 PM</span>
                      <div className="bg-blue-50/50 border border-blue-100 p-3 rounded-lg">
                        <p className="text-sm font-medium text-slate-800">Repair work scheduled for upcoming week. Site inspected.</p>
                      </div>
                    </div>
                  </div>

                  {/* Step 4: Resolved (Pending) */}
                  <div className="relative flex gap-4 opacity-50">
                    <div className="w-6 h-6 rounded-full bg-slate-300 border-4 border-white z-10 shrink-0 mt-0.5"></div>
                    <div className="flex flex-col">
                      <span className="text-base font-bold text-slate-600">Resolved</span>
                      <span className="text-sm font-medium text-slate-400 mb-2">Pending</span>
                      <p className="text-sm font-medium text-slate-500 italic">Awaiting final verification from field officer</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

>>>>>>> Stashed changes
          </section>
        )}

        {/* My Complaints List */}
        {user && (
          <div className="mt-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">My Submitted Complaints</h2>
            {listLoading ? (
              <div className="flex items-center gap-2 text-slate-500 py-8">
                <Loader2 size={20} className="animate-spin" /> Loading your complaints…
              </div>
            ) : myList.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-10 text-center text-slate-400">
                <p className="font-semibold">No complaints submitted yet.</p>
                <a href="/report" className="text-blue-600 font-semibold text-sm mt-2 inline-block hover:underline">File your first report →</a>
              </div>
            ) : (
              <div className="space-y-3">
                {myList.map(c => (
                  <button
                    key={c.id}
                    onClick={() => selectComplaint(c)}
                    className={`w-full text-left bg-white rounded-xl border p-5 hover:shadow-md transition-all ${complaint?.id === c.id ? 'border-blue-400 bg-blue-50/30' : 'border-slate-200'}`}
                  >
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs font-bold text-slate-500">{c.token}</span>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
                            c.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                            c.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                            'bg-gray-50 text-gray-600 border-gray-200'
                          }`}>{c.status}</span>
                        </div>
                        <p className="font-semibold text-slate-900 truncate">{c.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{c.category} · {c.address || c.ward || 'No location'}</p>
                      </div>
                      <span className="text-xs text-slate-400 shrink-0">
                        {c.createdAt?.toDate ? c.createdAt.toDate().toLocaleDateString('en-IN') : ''}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {!user && !complaint && (
          <div className="text-center py-10 text-slate-500">
            <p><a href="/auth" className="text-blue-600 font-semibold hover:underline">Sign in</a> to view your submitted complaints.</p>
          </div>
        )}

      </div>
    </div>
  );
}
