import { useState } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  AlertCircle, 
  CheckCircle2, 
  Info,
  Image as ImageIcon,
  Trash2,
  Crosshair,
  Droplets,
  Lightbulb,
  TreePine,
  VolumeX,
  Map
} from 'lucide-react';
import Dropdown from '../components/Dropdown';

const CATEGORIES = [
  { id: 'roads', label: 'Roads & Potholes', icon: AlertCircle },
  { id: 'waste', label: 'Waste Management', icon: Trash2 },
  { id: 'water', label: 'Water Supply & Drainage', icon: Droplets },
  { id: 'power', label: 'Street Lighting & Power', icon: Lightbulb },
  { id: 'parks', label: 'Public Parks & Trees', icon: TreePine },
  { id: 'noise', label: 'Pollution & Noise', icon: VolumeX }
];

const SUB_CATEGORIES = {
  roads: [
    { id: 'roads-1', label: 'Deep Pothole / Road Cave-in' },
    { id: 'roads-2', label: 'Broken Footpath / Pavement' },
    { id: 'roads-3', label: 'Damaged Road Divider' },
    { id: 'roads-4', label: 'Waterlogging on Road' },
    { id: 'roads-5', label: 'Illegal Road Obstruction' },
  ],
  waste: [
    { id: 'waste-1', label: 'Garbage Dump Not Cleared' },
    { id: 'waste-2', label: 'Dead Animal on Road' },
    { id: 'waste-3', label: 'Overflowing Dustbin' },
    { id: 'waste-4', label: 'Open Burning of Waste' },
    { id: 'waste-5', label: 'Sewage Overflow on Street' },
  ],
  water: [
    { id: 'water-1', label: 'Burst Water Pipeline' },
    { id: 'water-2', label: 'No Water Supply' },
    { id: 'water-3', label: 'Contaminated Water' },
    { id: 'water-4', label: 'Clogged / Blocked Drain' },
    { id: 'water-5', label: 'Manhole Open / Uncovered' },
  ],
  power: [
    { id: 'power-1', label: 'Street Light Not Working' },
    { id: 'power-2', label: 'Dangling / Broken Wire' },
    { id: 'power-3', label: 'Transformer Fault' },
    { id: 'power-4', label: 'Frequent Power Cuts' },
    { id: 'power-5', label: 'Electric Pole Damaged' },
  ],
  parks: [
    { id: 'parks-1', label: 'Dangerous Broken Tree Branch' },
    { id: 'parks-2', label: 'Vandalized Park Equipment' },
    { id: 'parks-3', label: 'Uprooted / Fallen Tree' },
    { id: 'parks-4', label: 'Broken Park Benches / Lights' },
    { id: 'parks-5', label: 'Encroachment on Public Land' },
  ],
  noise: [
    { id: 'noise-1', label: 'Illegal Loudspeaker / DJ' },
    { id: 'noise-2', label: 'Construction Noise at Night' },
    { id: 'noise-3', label: 'Factory / Industrial Noise' },
    { id: 'noise-4', label: 'Air / Dust Pollution' },
    { id: 'noise-5', label: 'Chemical / Smoke Emission' },
  ],
};

const WARDS = [
  { id: 'ward-14', label: 'Ward 14 - Central Municipal Zone (MG Road)', icon: Map },
  { id: 'ward-15', label: 'Ward 15 - East Zone (Indiranagar)', icon: Map },
  { id: 'ward-16', label: 'Ward 16 - South Zone (Koramangala)', icon: Map },
];

const ReportIssue = () => {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(SUB_CATEGORIES['roads'][0]);
  const [selectedWard, setSelectedWard] = useState(WARDS[0]);

  function handleCategoryChange(cat) {
    setSelectedCategory(cat);
    setSelectedSubCategory(SUB_CATEGORIES[cat.id][0]);
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                Fast-Track Citizen Redressal
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                Report an Issue
              </h1>
              <p className="text-gray-600 max-w-2xl text-lg">
                Submit local problems directly to municipal engineers in under 60 seconds. Every report is geo-tagged, time-stamped, and legally backed by statutory SLA timelines.
              </p>
            </div>
            
            <div className="shrink-0 flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2.5 rounded-lg border border-green-200">
              <ShieldCheck size={20} className="text-green-600" />
              <span className="font-semibold text-sm">Statutory SLA Guarantee<br/><span className="font-normal text-xs">Resolution in 48-72h or automated escalation</span></span>
            </div>
          </div>
        </div>

        {/* Desktop Stepper */}
        <div className="hidden md:flex items-center justify-between bg-white p-2 rounded-xl border border-gray-200 mb-8 shadow-sm">
          <div className="flex-1 flex items-center p-3 bg-blue-50 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm mr-3">1</div>
            <div>
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">Step 1 • Active</div>
              <div className="text-sm font-semibold text-blue-900">Category & Issue Details</div>
            </div>
          </div>
          <div className="w-8 flex justify-center text-gray-300">
            <div className="w-full h-px bg-gray-300"></div>
          </div>
          <div className="flex-1 flex items-center p-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center font-bold text-sm mr-3">2</div>
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Step 2</div>
              <div className="text-sm font-semibold text-gray-600">Location & Geo-Tagging</div>
            </div>
          </div>
          <div className="w-8 flex justify-center text-gray-300">
            <div className="w-full h-px bg-gray-300"></div>
          </div>
          <div className="flex-1 flex items-center p-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center font-bold text-sm mr-3">3</div>
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Step 3</div>
              <div className="text-sm font-semibold text-gray-600">Photo & Verification</div>
            </div>
          </div>
        </div>

        {/* Mobile Stepper */}
        <div className="md:hidden flex justify-between items-center mb-8 px-2">
           <div className="flex flex-col items-center flex-1">
             <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm mb-1 z-10">1</div>
             <span className="text-xs font-bold text-blue-600">Category</span>
           </div>
           <div className="h-px bg-blue-600 flex-1 -mt-5 mx-2"></div>
           <div className="flex flex-col items-center flex-1">
             <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold text-sm mb-1 z-10">2</div>
             <span className="text-xs font-medium text-gray-500">Location</span>
           </div>
           <div className="h-px bg-gray-200 flex-1 -mt-5 mx-2"></div>
           <div className="flex flex-col items-center flex-1">
             <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold text-sm mb-1 z-10">3</div>
             <span className="text-xs font-medium text-gray-500">Photo</span>
           </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-visible">
          
          <form className="divide-y divide-gray-100">
            
            {/* Section 1 */}
            <div className="p-6 md:p-8 relative">
              <div className="absolute left-0 top-8 bottom-0 w-1 bg-blue-600 rounded-r-md hidden md:block"></div>
              
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="text-blue-600 md:hidden">1.</span>
                  <span className="hidden md:inline">1.</span> Select Grievance Category
                </h2>
                <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2.5 py-1 rounded-md">Required</span>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-end mb-2">
                  <label className="block text-sm font-semibold text-gray-900">Grievance Category</label>
                  <span className="text-xs font-medium text-blue-600 flex items-center gap-1">
                    SLA: 48 hours
                  </span>
                </div>
                
                <Dropdown 
                  options={CATEGORIES} 
                  value={selectedCategory} 
                  onChange={handleCategoryChange} 
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Sub-Category</label>
                    <Dropdown 
                      options={SUB_CATEGORIES[selectedCategory.id]} 
                      value={selectedSubCategory} 
                      onChange={setSelectedSubCategory} 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Severity & Traffic Impact</label>
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                      <button type="button" className="flex-1 py-2 text-sm font-medium text-gray-600 rounded-md">Minor</button>
                      <button type="button" className="flex-1 py-2 text-sm font-bold text-amber-700 bg-white rounded-md shadow-sm border border-gray-200 flex items-center justify-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                        Moderate
                      </button>
                      <button type="button" className="flex-1 py-2 text-sm font-medium text-gray-600 rounded-md flex items-center justify-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        Critical
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="p-6 md:p-8 relative">
              <div className="absolute left-0 top-8 bottom-0 w-1 bg-blue-600 rounded-r-md hidden md:block"></div>
              
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600 md:hidden">2.</span>
                <span className="hidden md:inline">2.</span> Issue Details
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Title of Grievance</label>
                  <input type="text" 
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    defaultValue="Large drainage cave-in pothole opposite Metro Pillar 142"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-end mb-2">
                    <label className="block text-sm font-semibold text-gray-900">Detailed Description</label>
                    <span className="text-xs text-gray-500">148 / 500 characters</span>
                  </div>
                  <textarea 
                    rows={4}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    defaultValue="A 3-foot deep cave-in has formed near the storm-water culvert right across Metro Pillar 142. Two-wheelers are swerving abruptly causing severe traffic bottlenecks during morning rush hour."
                  />
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
                    <Info size={14} className="text-blue-500" />
                    <span>Clear descriptions help engineers dispatch the right repair equipment on the first visit.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="p-6 md:p-8 relative">
              <div className="absolute left-0 top-8 bottom-0 w-1 bg-blue-600 rounded-r-md hidden md:block"></div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="text-blue-600 md:hidden">3.</span>
                  <span className="hidden md:inline">3.</span> Location & Geo-Tag
                </h2>
                <button type="button" className="flex items-center justify-center gap-2 bg-blue-50 text-blue-700 hover:bg-blue-100 px-4 py-2 rounded-lg text-sm font-semibold border border-blue-200 transition-colors">
                  <Crosshair size={16} /> Detect GPS
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Ward / Locality</label>
                    <Dropdown 
                      options={WARDS} 
                      value={selectedWard} 
                      onChange={setSelectedWard} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Street Address / Landmark</label>
                    <input type="text" 
                      className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      defaultValue="Opposite Metro Pillar 142, Old Airport Road Junction"
                    />
                  </div>
                </div>

                <div className="h-64 bg-gray-200 rounded-lg border border-gray-300 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-[url('https://maps.wikimedia.org/osm-intl/13/5799/3820.png')] bg-cover bg-center opacity-70"></div>
                  
                  {/* Map Pin */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full z-10 flex flex-col items-center">
                    <div className="bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded shadow-lg mb-1 flex items-center gap-1">
                      <MapPin size={12} /> 12.9716° N, 77.5946° E
                    </div>
                    <MapPin size={32} className="text-red-500 drop-shadow-md" fill="#ef4444" />
                  </div>

                  {/* Map overlays */}
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-md shadow-sm border border-gray-200 flex items-center gap-2 text-xs font-semibold text-gray-700">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    GPS Accuracy: 4.6m
                  </div>
                  
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-md shadow-sm border border-gray-200 text-xs font-medium text-gray-600">
                    Drag pin to adjust
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="p-6 md:p-8 relative">
              <div className="absolute left-0 top-8 bottom-0 w-1 bg-blue-600 rounded-r-md hidden md:block"></div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="text-blue-600 md:hidden">4.</span>
                  <span className="hidden md:inline">4.</span> Photographic Proof
                </h2>
                <span className="text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-md text-xs font-bold flex items-center gap-1.5">
                  <CheckCircle2 size={14} /> AI Duplicate Scan Active
                </span>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 bg-gray-50 flex flex-col items-center justify-center text-center mb-4 hover:bg-gray-100 hover:border-blue-400 transition-colors cursor-pointer">
                <div className="bg-white p-3 rounded-full shadow-sm mb-4">
                  <ImageIcon size={28} className="text-blue-500" />
                </div>
                <h3 className="text-gray-900 font-bold mb-1">Drag & drop photos or browse files</h3>
                <p className="text-gray-500 text-sm mb-4">Supports JPG, PNG, HEIC up to 25MB</p>
                <button type="button" className="bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-lg text-sm shadow-sm hover:bg-gray-50">
                  Choose Files
                </button>
              </div>

              {/* Uploaded File Preview */}
              <div className="flex items-center justify-between bg-white border border-gray-200 p-3 rounded-lg shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded object-cover overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=100&h=100" alt="Pothole" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">IMG_20250218_PotholeCaveIn_Pillar142.jpg</div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-gray-500">3.4 MB</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-green-600 font-semibold flex items-center gap-1">
                        <CheckCircle2 size={12} /> EXIF Geo-Tagged
                      </span>
                    </div>
                  </div>
                </div>
                <button type="button" className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {/* Section 5 */}
            <div className="p-6 md:p-8 relative">
              <div className="absolute left-0 top-8 bottom-0 w-1 bg-blue-600 rounded-r-md hidden md:block"></div>
              
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600 md:hidden">5.</span>
                <span className="hidden md:inline">5.</span> Citizen Contact & Privacy
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
                  <input type="text" 
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    defaultValue="Sunita R. Deshmukh"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Mobile Number (for SMS token)</label>
                  <div className="flex shadow-sm rounded-lg">
                    <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                      +91
                    </span>
                    <input type="text" 
                      className="flex-1 block w-full px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      defaultValue="98450 12890"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Email (Optional)</label>
                  <input type="email" 
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    defaultValue="sunita.deshmukh@mailcivic.in"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex items-center h-5 mt-0.5">
                    <input id="anonymous" type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                  </div>
                  <label htmlFor="anonymous" className="text-sm text-gray-700">
                    <span className="font-semibold text-gray-900">Keep my name anonymous on the public feed.</span> (Phone remains accessible only to assigned Ward Engineers).
                  </label>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex items-center h-5 mt-0.5">
                    <input id="verify" type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                  </div>
                  <label htmlFor="verify" className="text-sm text-gray-700">
                    I verify this is a genuine civic issue and agree to receive updates under the <a href="#" className="font-semibold text-blue-600 hover:underline">Municipal Redressal Act SLA Terms</a>.
                  </label>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 md:p-8 bg-gray-50 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 border-t border-gray-200">
              <div className="flex gap-4 w-full sm:w-auto">
                <button type="button" className="flex-1 sm:flex-none px-6 py-3 border border-gray-300 shadow-sm text-sm font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Cancel
                </button>
                <button type="button" className="flex-1 sm:flex-none px-6 py-3 border border-gray-300 shadow-sm text-sm font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Save Draft
                </button>
              </div>
              <button type="button" className="w-full sm:w-auto px-8 py-3 border border-transparent shadow-sm text-sm font-bold rounded-lg text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 flex items-center justify-center gap-2">
                <CheckCircle2 size={18} /> Submit Issue & Get Token #
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default ReportIssue;

