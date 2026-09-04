import { ShieldCheck, Phone, MessageCircle, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="text-blue-600" size={24} />
              <h3 className="font-bold text-gray-900 text-lg uppercase tracking-wide">Municipal Ombudsman Charter</h3>
            </div>
            <h4 className="font-bold text-xl text-gray-900 mb-2">Guaranteed Statutory Timelines</h4>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Every filed grievance is legally bound to the Municipal Redressal SLA Charter. If unresolved within 48 hours, tickets auto-escalate directly to the Municipal Commissioner's office.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="text-blue-600 font-semibold hover:underline">Download SLA Charter (PDF)</a>
              <span className="text-gray-300 hidden sm:inline">•</span>
              <a href="#" className="text-blue-600 font-semibold hover:underline">Lodge First Appeal</a>
            </div>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Phone className="text-blue-600" size={24} />
              <h3 className="font-bold text-gray-900 text-lg uppercase tracking-wide">Alternate Redressal Channels</h3>
            </div>
            <h4 className="font-bold text-xl text-gray-900 mb-2">File via WhatsApp Bot or IVR Phone</h4>
            <p className="text-gray-600 mb-6 leading-relaxed">
              No internet app required. Report civic problems by texting our 24/7 automated WhatsApp service or dialing our toll-free phone numbers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                <MessageCircle size={18} /> WhatsApp: +91 88000-CIVIC
              </button>
              <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                <Phone size={18} /> Toll-Free: 1800-CIVIC-CARE
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <Building2 size={24} />
              </div>
              <h1 className="font-bold text-lg leading-tight text-gray-900">Public Issue<br/>Resolution Tracker</h1>
            </div>
            <p className="text-gray-500 text-sm mb-4">A transparent and accessible government service ensuring speedy, audited resolution of civic grievances across all city wards.</p>
            <div className="text-xs text-gray-400 font-medium flex items-center gap-1">
              <ShieldCheck size={14} /> 256-bit Encrypted Government Redressal Portal
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-4 uppercase tracking-wider text-sm">Quick Directory</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link to="#" className="hover:text-blue-600">Roads & Footpaths</Link></li>
              <li><Link to="#" className="hover:text-blue-600">Solid Waste & Sanitation</Link></li>
              <li><Link to="#" className="hover:text-blue-600">Water Supply & Drainage</Link></li>
              <li><Link to="#" className="hover:text-blue-600">Street Lighting & Power</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-4 uppercase tracking-wider text-sm">Citizen Rights</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link to="#" className="hover:text-blue-600">Citizen Charter of Rights</Link></li>
              <li><Link to="#" className="hover:text-blue-600">SLA Timelines & Norms</Link></li>
              <li><Link to="#" className="hover:text-blue-600">Appellate Ombudsman</Link></li>
              <li><Link to="#" className="hover:text-blue-600">Right to Information (RTI)</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-4 uppercase tracking-wider text-sm">Helpline & Support</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex justify-between"><span className="text-gray-500">Toll-Free:</span> <span className="font-medium text-gray-900">1800-CIVIC-CARE</span></li>
              <li className="flex justify-between"><span className="text-gray-500">Civic Emergency:</span> <span className="font-medium text-gray-900">112</span></li>
              <li className="flex justify-between"><span className="text-gray-500">Water Supply Desk:</span> <span className="font-medium text-gray-900">1916</span></li>
              <li className="flex justify-between"><span className="text-gray-500">Electricity Desk:</span> <span className="font-medium text-gray-900">1912</span></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <div>© 2025 Public Issue Resolution Tracker. Governed under the Municipal Redressal Act.</div>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-gray-900">Privacy Policy</Link>
            <Link to="#" className="hover:text-gray-900">Terms of Service</Link>
            <Link to="#" className="hover:text-gray-900">Accessibility Statement</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

