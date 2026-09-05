import {
  Search,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Trash2,
  Droplets,
  Lightbulb,
  TreePine,
  VolumeX,
  Camera,
  Cpu,
  UserCheck,
  FileText,
  HelpCircle,
  ArrowRight,
  Settings,
  Leaf,
  Loader2
} from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchPublicComplaints } from '../services/complaintService';

const Hero = () => {
  const [trackToken, setTrackToken] = useState('');
  const navigate = useNavigate();

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (trackToken.trim()) {
      navigate(`/track/${trackToken.trim()}`);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#fafcff]">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full border-[60px] border-[#f0f5ff] opacity-50" />
        <div className="absolute bottom-20 -right-20 w-[600px] h-[600px] rounded-full border-[80px] border-[#f0f5ff] opacity-50" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div className="max-w-2xl">

            {/* Headlines */}
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.05]">
              A Cleaner City<br />
              <span className="text-blue-600">Starts With You</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
              Report civic issues, track real-time resolution, and hold departments accountable. Geo-tag problems in 60 seconds and help build a better city.
            </p>

            {/* Tracking & Report Box */}
            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 p-2 mb-12 relative z-20">
              <div className="flex items-center justify-between px-4 pt-3 pb-4 border-b border-gray-50">
                <div className="flex gap-6">
                  <button className="text-blue-600 font-bold text-sm border-b-2 border-blue-600 pb-1 flex items-center gap-2">
                    Track an Issue
                  </button>
                </div>
              </div>

              <div className="p-4 pt-5">
                <form onSubmit={handleTrackSubmit} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Enter Grievance Token ID..."
                      value={trackToken}
                      onChange={(e) => setTrackToken(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors text-sm"
                    />
                  </div>
                  <button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 whitespace-nowrap shadow-sm shadow-slate-900/20">
                    Track Status <ArrowRight size={18} />
                  </button>
                </form>

                <div className="mt-5 pt-5 border-t border-gray-100">
                  <Link to="/report" className="w-full bg-[#2563eb] hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm shadow-blue-500/30">
                    Report a New Issue
                  </Link>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-8 md:gap-12 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="text-emerald-500" size={20} />
                </div>
                <div>
                  <div className="font-bold text-slate-900 leading-tight">24,850+</div>
                  <div className="text-xs text-slate-500 font-medium">Issues Resolved</div>
                </div>
              </div>
              <div className="w-px h-10 bg-gray-200 hidden sm:block"></div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <TrendingUp className="text-blue-500" size={20} />
                </div>
                <div>
                  <div className="font-bold text-slate-900 leading-tight">84.3%</div>
                  <div className="text-xs text-slate-500 font-medium">On-Time Resolution</div>
                </div>
              </div>
              <div className="w-px h-10 bg-gray-200 hidden md:block"></div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                  <ShieldCheck className="text-purple-500" size={20} />
                </div>
                <div>
                  <div className="font-bold text-slate-900 leading-tight">100%</div>
                  <div className="text-xs text-slate-500 font-medium">Citizen Verified</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column / Image Area */}
          <div className="relative h-[450px] sm:h-[550px] lg:h-full lg:min-h-[600px] mt-8 lg:mt-0 z-10">
            {/* Main Image */}
            <div className="absolute inset-0 right-[-20px] lg:right-[-50px] bg-gray-100 rounded-[30px] lg:rounded-[40px] rounded-tl-[100px] lg:rounded-tl-[160px] overflow-hidden shadow-2xl">
              <img src="/hero-image.webp" alt="Clean City" className="w-full h-full object-cover" />
            </div>

            {/* Connecting SVG Line */}
            <svg className="absolute top-10 lg:top-20 -left-6 w-full h-full pointer-events-none text-blue-300 z-10" viewBox="0 0 400 400" preserveAspectRatio="none">
              <path
                d="M 50 20 Q 200 20 200 120 T 350 180"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
            </svg>

            {/* Floating Cards (positioned absolute) */}

            {/* Report */}
            <div className="absolute top-6 lg:top-12 -left-2 lg:-left-8 bg-white/95 backdrop-blur rounded-2xl p-3 lg:p-4 shadow-xl flex items-center gap-3 lg:gap-4 w-[220px] lg:w-64 border border-white/40 z-20 hover:-translate-y-1 transition-transform">
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-[#2563eb] flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-500/40">
                <MapPin size={18} className="lg:w-5 lg:h-5" fill="currentColor" strokeWidth={1} />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-[13px] lg:text-sm">Report</div>
                <div className="text-[12px] lg:text-[13px] text-slate-500 leading-tight">Geo-tag the issue</div>
              </div>
              <ChevronRight size={16} className="text-gray-300 ml-auto" />
            </div>

            {/* Track */}
            <div className="absolute top-32 lg:top-48 left-10 lg:left-16 bg-white/95 backdrop-blur rounded-2xl p-3 lg:p-4 shadow-xl flex items-center gap-3 lg:gap-4 w-[220px] lg:w-64 border border-white/40 z-20 hover:-translate-y-1 transition-transform">
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-[#10b981] flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-500/40">
                <Settings size={18} className="lg:w-5 lg:h-5" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-[13px] lg:text-sm">Track</div>
                <div className="text-[12px] lg:text-[13px] text-slate-500 leading-tight">Real-time updates</div>
              </div>
              <ChevronRight size={16} className="text-gray-300 ml-auto" />
            </div>

            {/* See Change */}
            <div className="absolute top-[220px] lg:top-[280px] right-2 lg:right-6 bg-white/95 backdrop-blur rounded-2xl p-3 lg:p-4 shadow-xl flex items-center gap-3 lg:gap-4 w-[240px] lg:w-72 border border-white/40 z-20 hover:-translate-y-1 transition-transform">
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-[#8b5cf6] flex items-center justify-center text-white shrink-0 shadow-lg shadow-purple-500/40">
                <CheckCircle2 size={18} className="lg:w-5 lg:h-5" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-[13px] lg:text-sm">See Change</div>
                <div className="text-[12px] lg:text-[13px] text-slate-500 leading-tight">A better city, together</div>
              </div>
              <ChevronRight size={16} className="text-gray-300 ml-auto" />
            </div>

            {/* Bottom Badge */}
            <div className="absolute bottom-6 lg:bottom-16 left-6 lg:left-12 bg-white/90 backdrop-blur-md rounded-2xl p-3 lg:p-4 shadow-xl flex items-center gap-3 lg:gap-4 border border-white/50 z-20">
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                <Leaf size={18} className="lg:w-5 lg:h-5 text-emerald-600" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-[13px] lg:text-sm">Cleaner Today</div>
                <div className="text-[12px] lg:text-sm text-emerald-700 font-bold">Greener Tomorrow</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CategoryCard = ({ icon: Icon, title, activeCount, desc, sla }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow group flex flex-col h-full">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-gray-50 text-gray-700 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
        <Icon size={24} />
      </div>
      <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
        {activeCount} Active
      </span>
    </div>
    <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-500 text-sm mb-6 flex-grow">{desc}</p>
    <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
      <span className="text-xs text-gray-400 font-medium">SLA: {sla}</span>
      <Link to="/report" className="text-blue-600 text-sm font-semibold hover:text-blue-800 flex items-center">
        Report <ChevronRight size={16} />
      </Link>
    </div>
  </div>
);

const Categories = () => {
  return (
    <section className="bg-gray-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <div className="text-blue-600 font-bold text-sm tracking-wider uppercase mb-2">Categories</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Select Grievance Category</h2>
            <p className="text-gray-600">Submit directly to specialized field units with guaranteed SLA routing.</p>
          </div>
          <Link to="#" className="text-blue-600 font-medium hover:underline flex items-center gap-1 whitespace-nowrap">
            View all 24 departments <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CategoryCard
            icon={AlertCircle}
            title="Roads & Potholes"
            activeCount="312"
            desc="Potholes, broken footpaths, road cracks, damaged road signs, and illegal obstacles."
            sla="48 Hours"
          />
          <CategoryCard
            icon={Trash2}
            title="Waste Management"
            activeCount="184"
            desc="Overflowing public dustbins, uncollected household waste, and open dump hazards."
            sla="24 Hours"
          />
          <CategoryCard
            icon={Droplets}
            title="Water Supply & Drainage"
            activeCount="98"
            desc="Burst pipelines, water contamination, sewer leaks, and clogged rainwater drains."
            sla="12-24 Hours"
          />
          <CategoryCard
            icon={Lightbulb}
            title="Street Lighting & Power"
            activeCount="142"
            desc="Burnt out street lamps, hazardous electrical wires, and faulty timer switches."
            sla="24 Hours"
          />
          <CategoryCard
            icon={TreePine}
            title="Public Parks & Trees"
            activeCount="67"
            desc="Dangerous broken branches, vandalized playground amenities, and park irrigation leaks."
            sla="48 Hours"
          />
          <CategoryCard
            icon={VolumeX}
            title="Pollution & Noise"
            activeCount="54"
            desc="Loudspeakers past mandated curfew, illegal factory emission, and construction dust."
            sla="12 Hours"
          />
        </div>
      </div>
    </section>
  );
};

const WorkflowStep = ({ number, icon: Icon, title, desc, isLast }) => (
  <div className="flex-1 relative">
    <div className="bg-white border border-gray-200 rounded-xl p-6 h-full relative z-10">
      <div className="flex justify-between items-start mb-4">
        <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
          {number}
        </div>
        <div className="text-gray-400">
          <Icon size={24} />
        </div>
      </div>
      <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
    {!isLast && (
      <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-gray-300 z-0"></div>
    )}
  </div>
);

const Workflow = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <div className="text-blue-600 font-bold text-sm tracking-wider uppercase mb-2">Workflow</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">How An Issue Gets Resolved</h2>
        <p className="text-gray-600">Straightforward, audited steps from report to citizen sign-off.</p>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-8 relative">
        <WorkflowStep
          number="1"
          icon={Camera}
          title="Report & Geo-tag"
          desc="Snap a photo on site. The system auto-captures coordinates and checks duplicates."
        />
        <WorkflowStep
          number="2"
          icon={Cpu}
          title="AI & Officer Dispatch"
          desc="Assigned instantly to the designated Ward Engineer with an official SLA countdown."
        />
        <WorkflowStep
          number="3"
          icon={MapPin}
          title="Field Action"
          desc="Municipal ground crew resolves the issue and uploads photographic completion proof."
        />
        <WorkflowStep
          number="4"
          icon={UserCheck}
          title="Citizen Verification"
          desc="You review and approve the resolution. The ticket closes only with your consent."
          isLast={true}
        />
      </div>
    </section>
  );
};

const LiveFeedItem = ({ status, token, title, location, desc, meta1, meta2 }) => {
  const statusColors = {
    'Submitted': 'bg-gray-100 text-gray-700 border-gray-200',
    'Acknowledged': 'bg-blue-100 text-blue-700 border-blue-200',
    'Under Review': 'bg-blue-100 text-blue-700 border-blue-200',
    'In Progress': 'bg-amber-100 text-amber-700 border-amber-200',
    'Resolved': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  };

  const statusIcons = {
    'Submitted': <FileText className="text-gray-500" size={24} />,
    'Acknowledged': <Search className="text-blue-500" size={24} />,
    'Under Review': <Search className="text-blue-500" size={24} />,
    'In Progress': <Clock className="text-amber-500" size={24} />,
    'Resolved': <CheckCircle2 className="text-emerald-500" size={24} />,
  };

  return (
    <div className="flex gap-4 p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <div className="shrink-0 mt-1">
        {statusIcons[status] || <FileText className="text-gray-500" size={24} />}
      </div>
      <div className="flex-grow">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
          <span className="font-mono text-sm font-bold text-gray-900">{token}</span>
          <span className={`text-xs font-bold px-2.5 py-0.5 rounded border ${statusColors[status] || statusColors['Submitted']}`}>
            {status}
          </span>
          <span className="text-sm text-gray-500 hidden sm:inline">•</span>
          <span className="text-sm text-gray-500 flex items-center gap-1">
            <MapPin size={14} /> {location}
          </span>
        </div>
        <h3 className="font-bold text-gray-900 text-lg mb-1">{title}</h3>
        <p className="text-gray-600 text-sm mb-3">{desc}</p>
      </div>
      <div className="shrink-0 text-right flex flex-col justify-between hidden sm:flex">
        <div className="text-sm font-medium text-gray-900">{meta1}</div>
        <div className="text-xs text-gray-500">{meta2}</div>
      </div>
    </div>
  );
};

const LiveFeed = () => {
  const [allComplaints, setAllComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWard, setSelectedWard] = useState('All Wards');
  
  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchPublicComplaints();
        setAllComplaints(data);
      } catch (err) {
        console.error("Failed to load feed:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filtered = selectedWard === 'All Wards' 
    ? allComplaints 
    : allComplaints.filter(c => c.ward && c.ward.includes(selectedWard));

  const displayItems = useMemo(() => {
    return [...filtered].sort(() => 0.5 - Math.random()).slice(0, 4);
  }, [filtered]);

  const wards = ['All Wards', 'Ward 14', 'Ward 42', 'Ward 88'];

  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return 'Recently';
    const date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
    const diff = (Date.now() - date.getTime()) / 1000;
    if (diff < 3600) return `${Math.floor(diff / 60)} mins ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  };

  return (
    <section className="bg-gray-50 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <div className="text-blue-600 font-bold text-sm tracking-wider uppercase mb-2">Public Audit</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Live Grievance Feed</h2>
            <p className="text-gray-600">Real-time public status updates across wards.</p>
          </div>
          <div className="flex bg-white rounded-lg p-1 border border-gray-200">
            {wards.map(w => (
              <button 
                key={w}
                onClick={() => setSelectedWard(w)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedWard === w ? 'bg-slate-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                {w}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          {loading ? (
            <div className="p-12 text-center text-gray-500 font-medium flex flex-col items-center gap-3">
              <Loader2 className="animate-spin text-blue-500" size={32} />
              Loading live feed...
            </div>
          ) : displayItems.length === 0 ? (
            <div className="p-12 text-center text-gray-500 font-medium">No recent complaints found for this area.</div>
          ) : (
            displayItems.map(c => (
              <LiveFeedItem
                key={c.id}
                status={c.status || 'Submitted'}
                token={c.token}
                title={c.title}
                location={c.ward ? `${c.ward}${c.address ? `, ${c.address}` : ''}` : c.address || 'Location specified'}
                desc={c.description}
                meta1={`${c.status === 'Resolved' ? 'Resolved' : 'Reported'} ${formatTimeAgo(c.createdAt)}`}
                meta2={c.reportCount > 1 ? `${c.reportCount} Citizens Impacted` : 'New Report'}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <main>
      <Hero />
      <Categories />
      <Workflow />
      <LiveFeed />
    </main>
  );
};

export default Home;

