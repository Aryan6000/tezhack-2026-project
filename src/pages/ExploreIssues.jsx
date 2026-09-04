import { useState } from 'react';
import { 
  Search, 
  MapPin, 
  ArrowRight,
  ThumbsUp
} from 'lucide-react';
import Dropdown from '../components/Dropdown';

const CATEGORIES = [
  { id: 'roads', label: 'Roads & Potholes' },
  { id: 'waste', label: 'Waste Management' },
  { id: 'water', label: 'Water Supply' },
  { id: 'power', label: 'Street Lighting' },
];

const WARDS = [
  { id: 'w14', label: 'Ward 14 - Central' },
  { id: 'w42', label: 'Ward 42 - Market' },
  { id: 'w88', label: 'Ward 88 - South' },
  { id: 'w23', label: 'Ward 23 - East' },
];

const STATUSES = [
  { id: 'in_progress', label: 'In Progress' },
  { id: 'resolved', label: 'Resolved' },
  { id: 'under_review', label: 'Under Review' },
  { id: 'scheduled', label: 'Scheduled' },
  { id: 'assigned', label: 'Assigned' },
];

const MOCK_ISSUES = [
  {
    id: '#CIV-2025-8849',
    title: 'Large drainage cave-in pothole opposite Metro Pillar 142',
    description: 'Severe structural depression after water main maintenance. Buses and two-wheelers swerving dangerously into opposite lane during rush hours.',
    location: 'Ward 14, MG Road / Old Airport Junction',
    status: 'In Progress • 14h Left',
    statusType: 'warning',
    backed: 42
  },
  {
    id: '#CIV-2025-8812',
    title: 'Overflowing commercial garbage dump behind Market Complex',
    description: 'Unattended municipal waste bin blocking pedestrian corridor. Cleared and disinfected by sanitary quick-response squad.',
    location: 'Ward 42, Central Market Road',
    status: 'Resolved',
    statusType: 'success',
    backed: 28
  },
  {
    id: '#CIV-2025-8871',
    title: 'Three consecutive LED streetlights non-functional near School Crossing',
    description: 'Dark stretch creating security hazard for evening students and pedestrians. Underground cable fault suspected along perimeter wall.',
    location: 'Ward 88, 5th Cross Pedestrian Lane',
    status: 'Under Review',
    statusType: 'info',
    backed: 38
  },
  {
    id: '#CIV-2025-8890',
    title: 'Main potable water supply pipe leakage causing low pressure in Block B',
    description: 'Freshwater pipeline ruptured during cabling work. Households reporting zero water pressure in upper floors since morning.',
    location: 'Ward 14, Indiranagar 100ft Road',
    status: 'In Progress • 6h Left',
    statusType: 'warning',
    backed: 56
  },
  {
    id: '#CIV-2025-8902',
    title: 'Overgrown tree branches touching 11kV overhead electrical wire',
    description: 'Frequent sparks observed during windy conditions. Joint mitigation request approved by Power Board.',
    location: 'Ward 23, Lakeview Enclave',
    status: 'Scheduled',
    statusType: 'info',
    backed: 19
  },
  {
    id: '#CIV-2025-8915',
    title: 'Broken sidewalk concrete slabs creating trip hazard for elderly',
    description: 'High footfall corridor outside central bus terminus. Multiple complaints of minor injuries among senior citizens.',
    location: 'Ward 14, Bus Terminus Walkway',
    status: 'Assigned',
    statusType: 'info',
    backed: 23
  }
];

const StatusBadge = ({ status, type }) => {
  const styles = {
    warning: 'bg-orange-50 text-orange-700 border-orange-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    info: 'bg-blue-50 text-blue-700 border-blue-200'
  };
  
  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${styles[type] || 'bg-gray-50 text-gray-700 border-gray-200'}`}>
      {type === 'warning' && <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 mr-1.5 mb-px"></span>}
      {type === 'success' && <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 mb-px"></span>}
      {status}
    </span>
  );
};

const ExploreIssues = () => {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [selectedWard, setSelectedWard] = useState(WARDS[0]);
  const [selectedStatus, setSelectedStatus] = useState(STATUSES[0]);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">Public Issue Tracker</h1>
            <p className="text-gray-600 text-lg">Browse, filter, and track public municipal issues reported across city wards in real time.</p>
          </div>
          <button className="hidden md:flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shrink-0">
            <span className="text-lg leading-none">+</span> Report Issue
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-2 rounded-xl border border-gray-200 shadow-sm mb-10 flex flex-col lg:flex-row gap-2">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="text-gray-400" size={18} />
            </div>
            <input 
              type="text" 
              placeholder="Search issues by keyword, landmark, or token ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full h-full min-h-[48px] pl-11 pr-4 bg-gray-50/50 border-0 text-gray-900 rounded-lg focus:ring-0 placeholder:text-gray-500"
            />
          </div>
          
          <div className="h-px w-full lg:h-8 lg:w-px bg-gray-200 self-center hidden lg:block"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 lg:flex lg:w-auto">
            <div className="w-full lg:w-48 bg-gray-50/50 rounded-lg">
              <Dropdown 
                options={CATEGORIES} 
                value={selectedCategory} 
                onChange={setSelectedCategory} 
              />
            </div>
            <div className="w-full lg:w-48 bg-gray-50/50 rounded-lg">
              <Dropdown 
                options={WARDS} 
                value={selectedWard} 
                onChange={setSelectedWard} 
              />
            </div>
            <div className="w-full lg:w-40 bg-gray-50/50 rounded-lg">
              <Dropdown 
                options={STATUSES} 
                value={selectedStatus} 
                onChange={setSelectedStatus} 
              />
            </div>
          </div>
        </div>

        {/* Feed Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-900">Public Grievances Feed</h2>
            <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold px-2 py-0.5 rounded-md">348 Total</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            Sort by: <span className="font-bold text-gray-900 cursor-pointer flex items-center gap-1">Most Upvoted</span>
          </div>
        </div>

        {/* Issue Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {MOCK_ISSUES.map(issue => (
            <div key={issue.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col h-full">
              
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-semibold text-gray-500 tracking-wide">{issue.id}</span>
                <StatusBadge status={issue.status} type={issue.statusType} />
              </div>
              
              <h3 className="font-bold text-gray-900 text-lg leading-snug mb-3">
                {issue.title}
              </h3>
              
              <p className="text-sm text-gray-600 mb-6 flex-grow">
                {issue.description}
              </p>
              
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <MapPin size={16} className="text-gray-400 shrink-0" />
                <span className="truncate">{issue.location}</span>
              </div>
              
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                <button className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">
                  <ThumbsUp size={16} /> {issue.backed} Backed
                </button>
                <button className="flex items-center gap-1 text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors">
                  {issue.status === 'Resolved' ? 'View Audit' : 'Track Status'} <ArrowRight size={16} />
                </button>
              </div>
              
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 pt-6 mb-12 gap-4">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">1 - 6</span> of <span className="font-semibold text-gray-900">348</span> civic issues
          </p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 disabled:opacity-50">Previous</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md bg-slate-900 text-white text-sm font-medium">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md text-gray-700 hover:bg-gray-100 text-sm font-medium">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md text-gray-700 hover:bg-gray-100 text-sm font-medium">3</button>
            <span className="px-1 text-gray-400">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-md text-gray-700 hover:bg-gray-100 text-sm font-medium">58</button>
            <button className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md ml-1">Next</button>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-slate-900 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/3"></div>
          
          <div className="relative z-10 text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-2">Have a new civic grievance to report?</h3>
            <p className="text-slate-300">Submit in under 2 minutes with automated geolocation and photo upload.</p>
          </div>
          <button className="relative z-10 bg-white text-slate-900 px-6 py-3 rounded-lg font-bold shadow-sm hover:bg-gray-50 transition-colors whitespace-nowrap">
            File New Report
          </button>
        </div>

      </div>
    </div>
  );
};

export default ExploreIssues;
