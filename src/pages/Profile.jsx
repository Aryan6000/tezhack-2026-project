import { useEffect, useState } from 'react';
import { User, Mail, Calendar, MapPin, AlertCircle, CheckCircle2, Clock, Loader2, FileText, Activity, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { fetchMyComplaints } from '../services/complaintService';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const StatusBadge = ({ status }) => {
  const styles = {
    'Submitted':    'bg-gray-100 text-gray-700 border-gray-200',
    'Acknowledged': 'bg-blue-100 text-blue-700 border-blue-200',
    'In Progress':  'bg-amber-100 text-amber-700 border-amber-200',
    'Resolved':     'bg-emerald-100 text-emerald-700 border-emerald-200',
  };
  const Icons = {
    'Submitted':    FileText,
    'Acknowledged': Clock,
    'In Progress':  Activity,
    'Resolved':     CheckCircle2,
  };
  
  const StatusIcon = Icons[status] || Clock;
  const style = styles[status] || styles['Submitted'];

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${style}`}>
      <StatusIcon size={12} /> {status}
    </span>
  );
};

const Profile = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    async function loadComplaints() {
      try {
        const data = await fetchMyComplaints(user.uid);
        setComplaints(data);
      } catch (err) {
        console.error("Failed to fetch complaints:", err);
      } finally {
        setLoading(false);
      }
    }
    loadComplaints();
  }, [user, navigate]);

  if (!user) return null;

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const memberSince = user.metadata?.creationTime 
    ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'Recently';

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Citizen Profile</h1>
          <p className="text-gray-500">Manage your account details and track your reported issues.</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold border-4 border-white shadow-md shrink-0">
            {getInitials(user.displayName || profile?.fullName)}
          </div>
          
          <div className="flex-1 text-center md:text-left space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{user.displayName || profile?.fullName || 'Citizen User'}</h2>
              <div className="text-sm font-semibold text-blue-600 uppercase tracking-wide mt-1">
                {profile?.role === 'admin' ? 'Administrator' : profile?.role === 'officer' ? 'Municipal Officer' : 'Verified Citizen'}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-center md:justify-start gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-gray-400" />
                {user.email}
              </div>
              <div className="hidden sm:block text-gray-300">•</div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-400" />
                Member since {memberSince}
              </div>
            </div>
          </div>
          
          <div className="shrink-0 flex flex-col gap-3 w-full md:w-auto mt-4 md:mt-0">
            <button 
              onClick={() => setIsEditing(!isEditing)} 
              className="w-full md:w-auto px-6 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              Edit Profile <ChevronDown size={16} className={`transition-transform ${isEditing ? 'rotate-180' : ''}`} />
            </button>
            <Link to="/report" className="w-full md:w-auto text-center px-6 py-2.5 bg-[#2563eb] text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm inline-block">
              Report New Issue
            </Link>
          </div>
        </div>

        {/* Edit Profile Dropdown Section */}
        {isEditing && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-6">Edit Profile Details</h3>
            <form className="space-y-5 max-w-xl">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                <input type="text" defaultValue={user.displayName || profile?.fullName} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow text-sm" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                <input type="email" defaultValue={user.email} disabled className="w-full px-4 py-2.5 border border-gray-200 bg-gray-50 text-gray-500 rounded-xl cursor-not-allowed text-sm" />
                <p className="text-xs text-gray-500 mt-1.5">Email address is linked to your authentication provider and cannot be changed.</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                <input type="tel" placeholder="+91 XXXXX XXXXX" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow text-sm" />
              </div>
              <div className="pt-2 flex gap-3">
                <button type="button" onClick={() => setIsEditing(false)} className="px-5 py-2.5 border border-gray-300 rounded-xl font-semibold text-sm text-gray-700 hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="button" onClick={() => setIsEditing(false)} className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-semibold text-sm hover:bg-slate-800 transition-colors shadow-sm">Save Changes</button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Complaints List Section */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            My Reported Issues
            <span className="bg-blue-100 text-blue-700 text-xs py-0.5 px-2.5 rounded-full">{complaints.length}</span>
          </h3>
          
          {loading ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 flex flex-col items-center justify-center text-gray-400">
              <Loader2 size={32} className="animate-spin mb-4 text-blue-500" />
              <p>Loading your reports...</p>
            </div>
          ) : complaints.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 border-dashed p-12 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={28} className="text-gray-400" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">No Reports Yet</h4>
              <p className="text-gray-500 mb-6 max-w-md mx-auto text-sm">You haven't filed any civic issues yet. When you report a problem in your ward, it will appear here.</p>
              <Link to="/report" className="text-blue-600 font-semibold hover:underline">
                File your first report &rarr;
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="divide-y divide-gray-100">
                {complaints.map((complaint) => (
                  <motion.div key={complaint.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-bold text-slate-700">{complaint.token}</span>
                        <StatusBadge status={complaint.status} />
                      </div>
                      <h4 className="font-bold text-gray-900 text-lg leading-snug">{complaint.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5"><MapPin size={14} /> {complaint.ward || 'Location specified'}</span>
                        <span className="flex items-center gap-1.5"><Calendar size={14} /> {complaint.createdAt ? new Date(complaint.createdAt.seconds * 1000).toLocaleDateString() : 'Recent'}</span>
                      </div>
                    </div>
                    
                    <div className="shrink-0 flex items-center gap-3 md:flex-col md:items-end">
                      <Link to={`/track?token=${complaint.token}`} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors w-full md:w-auto text-center">
                        Track Status
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default Profile;

