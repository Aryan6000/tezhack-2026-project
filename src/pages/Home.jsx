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
  UserCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="pt-16 pb-24 px-4 max-w-5xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-8">
        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
        Civic Accountability & SLA Guarantee System
      </div>
      
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
        Public Issue Resolution Tracker
      </h1>
      
      <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12">
        Transparent civic issue reporting and real-time resolution for your city. Geo-tag problems in 60 seconds, monitor departmental SLAs, and audit community actions.
      </p>

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 overflow-hidden text-left mb-12">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Search size={18} className="text-blue-600" />
              Quick Token Redressal Lookup
            </h3>
            <Link to="/report" className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
              Want to file a new report? <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Enter Token ID (e.g., CIV-2025-8849)" 
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                defaultValue="CIV-2025-8849"
              />
            </div>
            <button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Track
            </button>
            <Link to="/report" className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors text-center inline-block">
              Report
            </Link>
          </div>

          <div className="mt-6 border border-amber-200 bg-amber-50 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="bg-amber-100 p-2 rounded-md mt-1 shrink-0">
                <AlertCircle className="text-amber-600" size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-gray-900 text-sm">MCN-2025-8849</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-900 font-medium text-sm">Road Cavity & Drainage Pothole</span>
                </div>
                <div className="text-sm text-gray-600 flex flex-wrap gap-x-2">
                  <span>Ward 14</span>
                  <span>•</span>
                  <span>Dept of Roads</span>
                  <span>•</span>
                  <span>Assigned to Er. R. Nair</span>
                </div>
              </div>
            </div>
            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
              <span className="bg-amber-200 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
                In Progress
              </span>
              <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
                SLA: 14h left
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 text-gray-600">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="text-green-500" size={24} />
          <span className="font-semibold text-gray-900 text-lg">24,850+</span>
          <span className="text-sm">Issues Resolved</span>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="text-blue-500" size={24} />
          <span className="font-semibold text-gray-900 text-lg">84.3%</span>
          <span className="text-sm">On-Time Resolution</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="text-purple-500" size={24} />
          <span className="font-semibold text-gray-900 text-lg">100%</span>
          <span className="text-sm">Citizen Verified</span>
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
    'Resolved': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'In Progress': 'bg-amber-100 text-amber-700 border-amber-200',
    'Under Review': 'bg-blue-100 text-blue-700 border-blue-200'
  };

  const statusIcons = {
    'Resolved': <CheckCircle2 className="text-emerald-500" size={24} />,
    'In Progress': <Clock className="text-amber-500" size={24} />,
    'Under Review': <Search className="text-blue-500" size={24} />
  };

  return (
    <div className="flex gap-4 p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <div className="shrink-0 mt-1">
        {statusIcons[status]}
      </div>
      <div className="flex-grow">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
          <span className="font-mono text-sm font-bold text-gray-900">{token}</span>
          <span className={`text-xs font-bold px-2.5 py-0.5 rounded border ${statusColors[status]}`}>
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
            <button className="px-4 py-2 bg-slate-900 text-white rounded-md text-sm font-medium">All Wards</button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm font-medium transition-colors">Ward 14</button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm font-medium transition-colors">Ward 42</button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm font-medium transition-colors">Ward 88</button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <LiveFeedItem 
            status="Resolved"
            token="CIV-2025-8852"
            title="Overflowing Municipal Garbage Bin Cleared"
            location="Ward 14, Commercial Zone"
            desc="Sanitation crew dispatched compactor truck. Cleared and disinfected within 11 hours."
            meta1="Resolved 3 hrs ago"
            meta2="SLA: 24h"
          />
          <LiveFeedItem 
            status="In Progress"
            token="CIV-2025-8849"
            title="Road Cavity & Drainage Pothole"
            location="Sector 8 Outer Ring"
            desc="Asphalt leveling crew and JCB on site. Assigned to Er. R. Nair."
            meta1="14h Remaining"
            meta2="42 Upvotes"
          />
          <LiveFeedItem 
            status="Under Review"
            token="CIV-2025-8873"
            title="Streetlight Cluster Dark Spot"
            location="Ward 88, D-Block Lane"
            desc="5 contiguous lamp posts out. Merged 3 resident reports. Lineman team scheduled tonight."
            meta1="Triaged 40 mins ago"
            meta2="12 Citizens Impacted"
          />
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

