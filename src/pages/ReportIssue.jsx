import { useState, useRef } from 'react';
import {
  ShieldCheck, MapPin, AlertCircle, CheckCircle2, Info,
  Image as ImageIcon, Trash2, Crosshair, Droplets,
  Lightbulb, TreePine, VolumeX, Map, Loader2, X, Users
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Dropdown from '../components/Dropdown';
import { submitComplaint, findDuplicates } from '../services/complaintService';

// ─── Data ────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: 'roads',  label: 'Roads & Potholes',        icon: AlertCircle },
  { id: 'waste',  label: 'Waste Management',          icon: Trash2 },
  { id: 'water',  label: 'Water Supply & Drainage',   icon: Droplets },
  { id: 'power',  label: 'Street Lighting & Power',   icon: Lightbulb },
  { id: 'parks',  label: 'Public Parks & Trees',      icon: TreePine },
  { id: 'noise',  label: 'Pollution & Noise',         icon: VolumeX },
  { id: 'others', label: 'Others',                    icon: Info },
];

const SUB_CATEGORIES = {
  roads:  [
    { id: 'roads-1', label: 'Deep Pothole / Road Cave-in' },
    { id: 'roads-2', label: 'Broken Footpath / Pavement' },
    { id: 'roads-3', label: 'Damaged Road Divider' },
    { id: 'roads-4', label: 'Waterlogging on Road' },
    { id: 'roads-5', label: 'Illegal Road Obstruction' },
  ],
  waste:  [
    { id: 'waste-1', label: 'Garbage Dump Not Cleared' },
    { id: 'waste-2', label: 'Dead Animal on Road' },
    { id: 'waste-3', label: 'Overflowing Dustbin' },
    { id: 'waste-4', label: 'Open Burning of Waste' },
    { id: 'waste-5', label: 'Sewage Overflow on Street' },
  ],
  water:  [
    { id: 'water-1', label: 'Burst Water Pipeline' },
    { id: 'water-2', label: 'No Water Supply' },
    { id: 'water-3', label: 'Contaminated Water' },
    { id: 'water-4', label: 'Clogged / Blocked Drain' },
    { id: 'water-5', label: 'Manhole Open / Uncovered' },
  ],
  power:  [
    { id: 'power-1', label: 'Street Light Not Working' },
    { id: 'power-2', label: 'Dangling / Broken Wire' },
    { id: 'power-3', label: 'Transformer Fault' },
    { id: 'power-4', label: 'Frequent Power Cuts' },
    { id: 'power-5', label: 'Electric Pole Damaged' },
  ],
  parks:  [
    { id: 'parks-1', label: 'Dangerous Broken Tree Branch' },
    { id: 'parks-2', label: 'Vandalized Park Equipment' },
    { id: 'parks-3', label: 'Uprooted / Fallen Tree' },
    { id: 'parks-4', label: 'Broken Park Benches / Lights' },
    { id: 'parks-5', label: 'Encroachment on Public Land' },
  ],
  noise:  [
    { id: 'noise-1', label: 'Illegal Loudspeaker / DJ' },
    { id: 'noise-2', label: 'Construction Noise at Night' },
    { id: 'noise-3', label: 'Factory / Industrial Noise' },
    { id: 'noise-4', label: 'Air / Dust Pollution' },
    { id: 'noise-5', label: 'Chemical / Smoke Emission' },
  ],
  others: [],
};

const WARDS = [
  { id: 'ward-14', label: 'Ward 14 - Central Municipal Zone (MG Road)', icon: Map },
  { id: 'ward-15', label: 'Ward 15 - East Zone (Indiranagar)',           icon: Map },
  { id: 'ward-16', label: 'Ward 16 - South Zone (Koramangala)',          icon: Map },
];

const SEVERITIES = ['Low', 'Medium', 'High', 'Critical'];

// ─── Component ───────────────────────────────────────────────────────────────
const ReportIssue = () => {
  const { user } = useAuth();
  const fileInputRef = useRef(null);

  // form state
  const [selectedCategory,    setSelectedCategory]    = useState(CATEGORIES[0]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(SUB_CATEGORIES['roads'][0]);
  const [selectedWard,        setSelectedWard]        = useState(WARDS[0]);
  const [severity,            setSeverity]            = useState('Medium');
  const [title,               setTitle]               = useState('');
  const [description,         setDescription]         = useState('');
  const [address,             setAddress]             = useState('');
  const [lat,                 setLat]                 = useState(null);
  const [lng,                 setLng]                 = useState(null);
  const [photoFile,           setPhotoFile]           = useState(null);
  const [photoPreview,        setPhotoPreview]        = useState(null);
  const [anonymous,           setAnonymous]           = useState(true);

  // ui state
  const [gpsLoading,   setGpsLoading]   = useState(false);
  const [submitting,   setSubmitting]   = useState(false);
  const [error,        setError]        = useState('');
  const [successToken, setSuccessToken] = useState('');

  // duplicate detection
  const [duplicates,    setDuplicates]    = useState([]);
  const [showDupeModal, setShowDupeModal] = useState(false);
  const [pendingSubmit, setPendingSubmit] = useState(false);

  // pagination state
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  function handleCategoryChange(cat) {
    setSelectedCategory(cat);
    setSelectedSubCategory(SUB_CATEGORIES[cat.id]?.[0] || null);
  }

  function handlePhoto(file) {
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Please upload an image file.'); return; }
    if (file.size > 10 * 1024 * 1024)   { setError('Image must be under 10MB.'); return; }
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
    setError('');
  }

  function detectGPS() {
    if (!navigator.geolocation) { setError('Geolocation not supported.'); return; }
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
        // reverse geocode via Nominatim (free, no key needed)
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`,
            { headers: { 'Accept-Language': 'en' } }
          );
          const data = await res.json();
          setAddress(data.display_name || '');
        } catch { /* ignore geocode failure */ }
        setGpsLoading(false);
      },
      () => { setError('Could not get location. Enter address manually.'); setGpsLoading(false); },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  function handleNext() {
    setError('');
    if (currentStep === 1) {
      if (!title.trim() || !description.trim()) {
        setError('Please enter a title and description.');
        return;
      }
    }
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  }

  function handlePrev() {
    setError('');
    setCurrentStep(prev => Math.max(prev - 1, 1));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!user)               { setError('You must be signed in to submit a report.'); return; }
    if (!title.trim())       { setError('Please enter a title.'); return; }
    if (!description.trim()) { setError('Please enter a description.'); return; }

    setSubmitting(true);
    try {
      // Check for duplicates first
      if (!pendingSubmit) {
        const dupes = await findDuplicates({
          category: selectedCategory.label,
          lat, lng,
          title: title.trim(),
          description: description.trim(),
        });
        if (dupes.length > 0) {
          setDuplicates(dupes);
          setShowDupeModal(true);
          setSubmitting(false);
          return;
        }
      }
      await doSubmit(null);
    } catch (err) {
      setError(err.message || 'Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  async function doSubmit(linkedId) {
    setSubmitting(true);
    setError('');
    try {
      const { token } = await submitComplaint({
        userId:      user.uid,
        userName:    user.displayName || '',
        userEmail:   user.email || '',
        category:    selectedCategory.label,
        subCategory: selectedSubCategory?.label || '',
        severity,
        title:       title.trim(),
        description: description.trim(),
        ward:        selectedWard.label,
        address:     address.trim(),
        lat, lng,
        anonymous,
      }, photoFile, linkedId);
      setSuccessToken(token);
    } catch (err) {
      setError(err.message || 'Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
      setPendingSubmit(false);
    }
  }

  // ── Success screen ──────────────────────────────────────────────────────────
  if (successToken) {
    return (
      <div className="bg-gray-50 min-h-screen py-10 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={36} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Issue Submitted!</h2>
          <p className="text-gray-500 text-sm mb-6">Your complaint has been recorded. Use this token to track it.</p>
          <div className="bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 mb-6">
            <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">Tracking Token</p>
            <p className="font-mono text-2xl font-bold text-slate-900">{successToken}</p>
          </div>
          <button onClick={() => { setSuccessToken(''); setCurrentStep(1); setTitle(''); setDescription(''); }}
            className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold text-sm hover:bg-slate-800"
          >
            Report Another Issue
          </button>
        </div>
      </div>
    );
  }

  // ── Form ────────────────────────────────────────────────────────────────────
  return (
    <div className="bg-gray-50 min-h-screen py-10">

      {/* Duplicate Warning Modal */}
      {showDupeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-amber-50 border-b border-amber-100 px-6 py-4 flex items-start gap-3">
              <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={22} />
              <div>
                <h3 className="font-bold text-gray-900">⚠ Possible Similar Issue Found</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {duplicates[0]?.reportCount > 1
                    ? `${duplicates[0].reportCount} people have already reported an issue about this location.`
                    : 'A similar issue has already been reported nearby.'}
                </p>
              </div>
            </div>
            <div className="p-5 space-y-3 max-h-64 overflow-y-auto">
              {duplicates.map(d => (
                <div key={d.id} className="border border-amber-200 bg-amber-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-gray-500">{d.token}</span>
                    <span className="text-xs bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded-full">
                      {d.score}% match
                    </span>
                  </div>
                  <p className="font-semibold text-gray-900 text-sm">{d.title}</p>
                  {d.address && <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><MapPin size={11}/> {d.address}</p>}
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-blue-600 font-medium">Status: {d.status}</span>
                    {(d.reportCount || 1) > 1 && (
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Users size={11}/> {d.reportCount} citizens reported
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 pb-5 flex gap-3">
              <button
                onClick={() => setShowDupeModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl font-semibold text-sm text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => { setShowDupeModal(false); setPendingSubmit(true); doSubmit(duplicates[0]?.id); }}
                className="flex-1 px-4 py-3 bg-slate-900 text-white rounded-xl font-semibold text-sm hover:bg-slate-800"
              >
                Submit Anyway
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                Fast-Track Citizen Redressal
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Report an Issue</h1>
              <p className="text-gray-600 max-w-2xl text-lg">
                Submit local problems directly to municipal engineers in under 60 seconds. Every report is geo-tagged, time-stamped, and legally backed by statutory SLA timelines.
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2.5 rounded-lg border border-green-200">
              <ShieldCheck size={20} className="text-green-600" />
              <span className="font-semibold text-sm">Statutory SLA Guarantee<br /><span className="font-normal text-xs">Resolution in 48-72h or automated escalation</span></span>
            </div>
          </div>
        </div>

        {/* Desktop Stepper */}
        <div className="hidden md:flex items-center justify-between bg-white p-2 rounded-xl border border-gray-200 mb-8 shadow-sm">
          {[
            ['Category & Issue Details', 'Step 1'],
            ['Location & Geo-Tagging', 'Step 2'],
            ['Photo & Verification', 'Step 3']
          ].map(([label, stepName], i) => {
            const stepNum = i + 1;
            const active = currentStep === stepNum;
            const completed = currentStep > stepNum;
            return (
              <div key={i} className={`flex-1 flex items-center p-3 ${active ? 'bg-blue-50 rounded-lg' : ''}`}>
                {i > 0 && <div className="w-8 mr-3"><div className={`h-px w-full ${completed ? 'bg-blue-600' : 'bg-gray-300'}`} /></div>}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-3 ${active ? 'bg-blue-600 text-white' : completed ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {completed ? <CheckCircle2 size={16} /> : stepNum}
                </div>
                <div>
                  <div className={`text-xs font-bold uppercase tracking-wider ${active ? 'text-blue-600' : completed ? 'text-blue-600' : 'text-gray-400'}`}>
                    {stepName} {active ? '• ACTIVE' : ''}
                  </div>
                  <div className={`text-sm font-semibold ${active || completed ? 'text-blue-900' : 'text-gray-600'}`}>{label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Stepper */}
        <div className="md:hidden flex justify-between items-center mb-8 px-2">
          {['Category', 'Location', 'Photo'].map((s, i) => {
            const stepNum = i + 1;
            const active = currentStep === stepNum;
            const completed = currentStep > stepNum;
            return (
              <div key={i} className="flex flex-col items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mb-1 z-10 ${active || completed ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {completed ? <CheckCircle2 size={16} /> : stepNum}
                </div>
                <span className={`text-xs font-${active ? 'bold' : 'medium'} ${active || completed ? 'text-blue-600' : 'text-gray-500'}`}>{s}</span>
              </div>
            );
          })}
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-visible">
          <form className="divide-y divide-gray-100" onSubmit={handleSubmit}>

            {currentStep === 1 && (
              <>
                {/* Section 1 — Category */}
                <div className="p-6 md:p-8 relative">
                  <div className="absolute left-0 top-8 bottom-0 w-1 bg-blue-600 rounded-r-md hidden md:block" />
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      Select Grievance Category
                    </h2>
                    <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2.5 py-1 rounded-md">Required</span>
                  </div>
                  <div className="space-y-6">
                    <div className="flex justify-between items-end mb-2">
                      <label className="block text-sm font-semibold text-gray-900">Grievance Category</label>
                      <span className="text-xs font-medium text-blue-600">SLA: 48 hours</span>
                    </div>
                    <Dropdown options={CATEGORIES} value={selectedCategory} onChange={handleCategoryChange} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {selectedCategory.id !== 'others' && (
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-2">Sub-Category</label>
                          <Dropdown options={SUB_CATEGORIES[selectedCategory.id]} value={selectedSubCategory} onChange={setSelectedSubCategory} />
                        </div>
                      )}
                      <div className={selectedCategory.id === 'others' ? 'md:col-span-2 md:max-w-xs' : ''}>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Safety & Priority</label>
                        <div className="flex bg-gray-100 p-1 rounded-lg">
                          {SEVERITIES.map((s) => (
                            <button key={s} type="button" onClick={() => setSeverity(s)}
                              className={`flex-1 py-2 text-sm rounded-md transition-all flex items-center justify-center gap-1.5 ${
                                severity === s
                                  ? `font-bold bg-white shadow-sm border border-gray-200 ${s === 'Low' ? 'text-green-700' : s === 'Medium' ? 'text-amber-700' : s === 'High' ? 'text-orange-700' : 'text-red-700'}`
                                  : 'font-medium text-gray-600'
                              }`}
                            >
                              {severity === s && <div className={`w-2 h-2 rounded-full ${s === 'Low' ? 'bg-green-500' : s === 'Medium' ? 'bg-amber-500' : s === 'High' ? 'bg-orange-500' : 'bg-red-500'}`} />}
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2 — Issue Details */}
                <div className="p-6 md:p-8 relative">
                  <div className="absolute left-0 top-8 bottom-0 w-1 bg-blue-600 rounded-r-md hidden md:block" />
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    Issue Details
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Title of Grievance</label>
                      <input type="text" value={title} onChange={e => setTitle(e.target.value)}
                        placeholder="Brief title describing the issue"
                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                    <div>
                      <div className="flex justify-between items-end mb-2">
                        <label className="block text-sm font-semibold text-gray-900">Detailed Description</label>
                        <span className="text-xs text-gray-500">{description.length} / 500 characters</span>
                      </div>
                      <textarea rows={4} value={description} onChange={e => setDescription(e.target.value.slice(0, 500))}
                        placeholder="Describe the issue — what you see, how long it's been there, who is affected."
                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                      <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
                        <Info size={14} className="text-blue-500" />
                        <span>Clear descriptions help engineers dispatch the right repair equipment on the first visit.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                {/* Section 3 — Location */}
                <div className="p-6 md:p-8 relative">
                  <div className="absolute left-0 top-8 bottom-0 w-1 bg-blue-600 rounded-r-md hidden md:block" />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      Location & Geo-Tag
                    </h2>
                    <button type="button" onClick={detectGPS} disabled={gpsLoading}
                      className="flex items-center justify-center gap-2 bg-blue-50 text-blue-700 hover:bg-blue-100 px-4 py-2 rounded-lg text-sm font-semibold border border-blue-200 transition-colors disabled:opacity-60">
                      {gpsLoading ? <Loader2 size={16} className="animate-spin" /> : <Crosshair size={16} />}
                      {gpsLoading ? 'Detecting...' : 'Detect GPS'}
                    </button>
                  </div>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Ward / Locality</label>
                        <Dropdown options={WARDS} value={selectedWard} onChange={setSelectedWard} />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Street Address / Landmark</label>
                        <input type="text" value={address} onChange={e => setAddress(e.target.value)}
                          placeholder="Street address or nearby landmark"
                          className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                      </div>
                    </div>
                    <div className="h-64 bg-gray-200 rounded-lg border border-gray-300 relative overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 bg-[url('https://maps.wikimedia.org/osm-intl/13/5799/3820.png')] bg-cover bg-center opacity-70" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full z-10 flex flex-col items-center">
                        <div className="bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded shadow-lg mb-1 flex items-center gap-1">
                          <MapPin size={12} /> {lat ? `${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E` : '12.9716° N, 77.5946° E'}
                        </div>
                        <MapPin size={32} className="text-red-500 drop-shadow-md" fill="#ef4444" />
                      </div>
                      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-md shadow-sm border border-gray-200 flex items-center gap-2 text-xs font-semibold text-gray-700">
                        <div className={`w-2 h-2 rounded-full ${lat ? 'bg-green-500' : 'bg-gray-400'}`} />
                        {lat ? 'GPS Captured' : 'GPS Accuracy: 4.6m'}
                      </div>
                      <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-md shadow-sm border border-gray-200 text-xs font-medium text-gray-600">
                        Drag pin to adjust
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {currentStep === 3 && (
              <>
                {/* Section 4 — Photo */}
                <div className="p-6 md:p-8 relative">
                  <div className="absolute left-0 top-8 bottom-0 w-1 bg-blue-600 rounded-r-md hidden md:block" />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      Photographic Proof
                    </h2>
                    <span className="text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-md text-xs font-bold flex items-center gap-1.5">
                      <CheckCircle2 size={14} /> AI Duplicate Scan Active
                    </span>
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
                    onChange={e => handlePhoto(e.target.files[0])} />
                  {!photoPreview ? (
                    <div onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-gray-300 rounded-xl p-8 bg-gray-50 flex flex-col items-center justify-center text-center mb-4 hover:bg-gray-100 hover:border-blue-400 transition-colors cursor-pointer">
                      <div className="bg-white p-3 rounded-full shadow-sm mb-4">
                        <ImageIcon size={28} className="text-blue-500" />
                      </div>
                      <h3 className="text-gray-900 font-bold mb-1">Drag & drop photos or browse files</h3>
                      <p className="text-gray-500 text-sm mb-4">Supports JPG, PNG, HEIC up to 10MB</p>
                      <button type="button" className="bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-lg text-sm shadow-sm hover:bg-gray-50">
                        Choose Files
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between bg-white border border-gray-200 p-3 rounded-lg shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden">
                          <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm truncate max-w-[200px]">{photoFile.name}</div>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-gray-500">{(photoFile.size / 1024 / 1024).toFixed(1)} MB</span>
                            <span className="text-gray-300">•</span>
                            <span className="text-green-600 font-semibold flex items-center gap-1">
                              <CheckCircle2 size={12} /> Ready to upload
                            </span>
                          </div>
                        </div>
                      </div>
                      <button type="button" onClick={() => { setPhotoFile(null); setPhotoPreview(null); }}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors">
                        <X size={18} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Section 5 — Contact */}
                <div className="p-6 md:p-8 relative">
                  <div className="absolute left-0 top-8 bottom-0 w-1 bg-blue-600 rounded-r-md hidden md:block" />
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    Citizen Contact & Privacy
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
                      <input type="text" defaultValue={user?.displayName || ''}
                        placeholder="Your full name"
                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Phone Number</label>
                      <div className="flex shadow-sm rounded-lg">
                        <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">+91</span>
                        <input type="tel" placeholder="98XXXXXXXX"
                          className="flex-1 block w-full px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Email (Optional)</label>
                      <input type="email" defaultValue={user?.email || ''}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <input id="anonymous" type="checkbox" checked={anonymous} onChange={e => setAnonymous(e.target.checked)}
                        className="mt-0.5 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                      <label htmlFor="anonymous" className="text-sm text-gray-700">
                        <span className="font-semibold text-gray-900">Keep my name anonymous on the public feed.</span> (Your identity will only be visible to the admin for contact purposes).
                      </label>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Footer Navigation */}
            <div className="p-6 md:p-8 bg-gray-50 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 border-t border-gray-200">
              {error && (
                <div className="w-full sm:w-auto flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 text-sm">
                  <AlertCircle size={16} className="shrink-0" /> {error}
                </div>
              )}
              <div className="flex gap-4 w-full sm:w-auto sm:ml-auto">
                {currentStep > 1 && (
                  <button type="button" onClick={handlePrev}
                    className="flex-1 sm:flex-none px-6 py-3 border border-gray-300 shadow-sm text-sm font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                    Back
                  </button>
                )}
                {currentStep < totalSteps ? (
                  <button type="button" onClick={handleNext}
                    className="flex-1 sm:flex-none w-full sm:w-auto px-8 py-3 border border-transparent shadow-sm text-sm font-bold rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                    Continue to Step {currentStep + 1}
                  </button>
                ) : (
                  <button type="submit" disabled={submitting}
                    className="flex-1 sm:flex-none w-full sm:w-auto px-8 py-3 border border-transparent shadow-sm text-sm font-bold rounded-lg text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-60 flex items-center justify-center gap-2 transition-colors">
                    {submitting ? <><Loader2 size={16} className="animate-spin" /> Submitting...</> : <><CheckCircle2 size={18} /> Submit Issue & Get Token #</>}
                  </button>
                )}
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportIssue;
