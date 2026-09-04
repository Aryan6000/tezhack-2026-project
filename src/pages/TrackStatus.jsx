import { useState } from 'react';
import { Search, PenTool, MapPin, Calendar, Building, MessageSquare, Check, Clock } from 'lucide-react';

const TrackStatus = () => {
  const [trackingId, setTrackingId] = useState('#CIV-2025-8849');
  const [isTracking, setIsTracking] = useState(true);

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Search Section */}
        <section className="flex flex-col items-center gap-4 w-full max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Track Your Grievance</h1>
          <p className="text-lg text-slate-600 mb-2">Enter your tracking ID to view the latest status updates and assigned departments.</p>
          
          <div className="flex w-full relative h-14 shadow-sm">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Search size={20} />
            </div>
            <input 
              className="w-full h-full pl-12 pr-4 py-3 border border-slate-300 rounded-l-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-slate-900" 
              placeholder="Grievance Tracking ID (e.g. #CIV-2025-8849)" 
              type="text" 
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
            />
            <button 
              onClick={() => setIsTracking(true)}
              className="h-full px-8 bg-slate-900 text-white font-semibold rounded-r-lg hover:bg-slate-800 transition-colors whitespace-nowrap"
            >
              Track Status
            </button>
          </div>
        </section>

        {/* Result Section */}
        {isTracking && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
            
            {/* Details Card */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(51,65,85,0.05)] p-8 border border-slate-200 h-full">
                
                <div className="flex flex-wrap justify-between items-start gap-4 mb-6 border-b border-slate-100 pb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-1 leading-tight">Large drainage cave-in pothole opposite Metro Pillar 142</h2>
                    <p className="text-sm font-medium text-slate-500">ID: #CIV-2025-8849</p>
                  </div>
                  <div className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm font-bold inline-flex items-center gap-1.5 shrink-0 border border-blue-100">
                    <Clock size={16} />
                    In Progress
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Category</span>
                    <span className="text-slate-900 flex items-center gap-2 font-medium">
                      <PenTool size={18} className="text-slate-400" />
                      Roads & Potholes
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Location</span>
                    <span className="text-slate-900 flex items-center gap-2 font-medium">
                      <MapPin size={18} className="text-slate-400" />
                      Sector 14, Main Arterial Road
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Date Submitted</span>
                    <span className="text-slate-900 flex items-center gap-2 font-medium">
                      <Calendar size={18} className="text-slate-400" />
                      Jan 15, 2025
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Assigned Dept</span>
                    <span className="text-slate-900 flex items-center gap-2 font-medium">
                      <Building size={18} className="text-slate-400" />
                      Public Works Dept
                    </span>
                  </div>
                </div>
                
                {/* Citizen Note */}
                <div className="bg-slate-50 border-l-4 border-blue-500 p-5 rounded-r-lg mt-auto">
                  <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <MessageSquare size={16} className="text-blue-600" />
                    Citizen Note
                  </h3>
                  <p className="text-slate-700 italic text-sm leading-relaxed">
                    "The cave-in is expanding and poses a serious risk to two-wheelers, especially at night. It's located exactly opposite to Pillar 142 on the northbound lane."
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline Section */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(51,65,85,0.05)] p-8 border border-slate-200 h-full">
                <h2 className="text-xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4">Resolution Timeline</h2>
                
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
            
          </section>
        )}

      </div>
    </div>
  );
};

export default TrackStatus;

