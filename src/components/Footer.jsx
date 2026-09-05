import { Shield, Users, Leaf, ArrowUp, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-white pt-10 overflow-hidden border-t border-gray-200">
      <div className="w-full px-4 sm:px-6 lg:px-12 relative z-20">
        
        {/* Main Content Row */}
        <div className="flex flex-col lg:flex-row justify-between mb-24">
          
          {/* Column 1: Brand & Description (approx 35% width) */}
          <div className="lg:w-[35%] pr-6 mb-12 lg:mb-0">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-[#2563eb] text-white p-3 rounded-2xl shadow-sm">
                <Building2 size={28} strokeWidth={2} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[28px] text-[#0f172a] leading-none mb-1.5 tracking-tight">PIRT</span>
                <span className="text-[13px] font-semibold text-slate-500 tracking-wide">Public Issue Resolution Tracker</span>
              </div>
            </div>
            
            <p className="text-slate-500 text-[15px] leading-relaxed mb-10 max-w-sm font-medium">
              A transparent and accessible government service ensuring speedy, audited resolution of civic grievances across all city wards.
            </p>
            
            <div className="flex items-center gap-4 text-[13px] font-semibold text-slate-500">
              <div className="flex items-center gap-2">
                <Shield size={18} className="text-[#2563eb]" strokeWidth={2.5} /> Transparent
              </div>
              <div className="w-px h-5 bg-gray-200"></div>
              <div className="flex items-center gap-2">
                <Users size={18} className="text-[#2563eb]" strokeWidth={2.5} /> Citizen First
              </div>
              <div className="w-px h-5 bg-gray-200"></div>
              <div className="flex items-center gap-2">
                <Leaf size={18} className="text-[#10b981]" strokeWidth={2.5} /> Better Cities
              </div>
            </div>
          </div>
          
          {/* Vertical Divider 1 */}
          <div className="hidden lg:block w-px bg-gray-200 mx-4"></div>
          
          {/* Column 2: Explore */}
          <div className="lg:w-[15%] px-2 lg:px-6 mb-8 lg:mb-0">
            <h4 className="font-bold text-[#0f172a] mb-6 text-[15px]">Explore</h4>
            <ul className="space-y-4 text-[14px] text-slate-500 font-medium">
              <li><Link to="/report" className="hover:text-blue-600 transition-colors">Report an Issue</Link></li>
              <li><Link to="/track" className="hover:text-blue-600 transition-colors">Track Status</Link></li>
              <li><Link to="#" className="hover:text-blue-600 transition-colors">Issue Categories</Link></li>
              <li><Link to="#" className="hover:text-blue-600 transition-colors">How It Works</Link></li>
            </ul>
          </div>
          
          {/* Vertical Divider 2 */}
          <div className="hidden lg:block w-px bg-gray-200 mx-4"></div>
          
          {/* Column 3: Resources */}
          <div className="lg:w-[15%] px-2 lg:px-6 mb-8 lg:mb-0">
            <h4 className="font-bold text-[#0f172a] mb-6 text-[15px]">Resources</h4>
            <ul className="space-y-4 text-[14px] text-slate-500 font-medium">
              <li><Link to="#" className="hover:text-blue-600 transition-colors">Citizen Charter</Link></li>
              <li><Link to="#" className="hover:text-blue-600 transition-colors">SLA Timelines</Link></li>
              <li><Link to="#" className="hover:text-blue-600 transition-colors">Grievance Redressal Act</Link></li>
              <li><Link to="#" className="hover:text-blue-600 transition-colors">FAQs</Link></li>
            </ul>
          </div>
          
          {/* Vertical Divider 3 */}
          <div className="hidden lg:block w-px bg-gray-200 mx-4"></div>
          
          {/* Column 4: About */}
          <div className="lg:w-[15%] px-2 lg:px-6">
            <h4 className="font-bold text-[#0f172a] mb-6 text-[15px]">About</h4>
            <ul className="space-y-4 text-[14px] text-slate-500 font-medium">
              <li><Link to="/about" className="hover:text-blue-600 transition-colors">Our Mission</Link></li>
              <li><Link to="#" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
              <li><Link to="#" className="hover:text-blue-600 transition-colors">Accessibility</Link></li>
            </ul>
          </div>
          

          
        </div>
      </div>
      
      {/* Cityscape & Waves SVG */}
      <div className="absolute bottom-0 left-0 w-full h-[320px] pointer-events-none z-10 overflow-hidden">
        <svg viewBox="0 0 1440 320" className="w-full h-full object-cover object-bottom" preserveAspectRatio="none">
          {/* Background Hills */}
          <path fill="#f8faff" d="M300,320 C600,100 900,50 1440,250 L1440,320 Z" />
          <path fill="#f0f5ff" d="M0,280 C300,180 400,320 900,150 C1200,80 1300,280 1440,150 L1440,320 L0,320 Z" />
          
          {/* City Skyline (Right) */}
          <g transform="translate(950, 150)" fill="#d1e3ff">
            {/* Buildings */}
            <rect x="20" y="60" width="35" height="110" rx="2" />
            <rect x="65" y="30" width="30" height="140" rx="2" />
            <rect x="105" y="70" width="25" height="100" rx="2" />
            <rect x="140" y="20" width="50" height="150" rx="3" />
            <rect x="200" y="60" width="30" height="110" rx="2" />
            <rect x="240" y="45" width="40" height="125" rx="2" />
            <rect x="290" y="80" width="35" height="90" rx="2" />
            
            {/* Windows on main building */}
            <g fill="#ffffff" opacity="0.6">
              <rect x="150" y="35" width="6" height="6" rx="1" />
              <rect x="162" y="35" width="6" height="6" rx="1" />
              <rect x="174" y="35" width="6" height="6" rx="1" />
              
              <rect x="150" y="52" width="6" height="6" rx="1" />
              <rect x="162" y="52" width="6" height="6" rx="1" />
              <rect x="174" y="52" width="6" height="6" rx="1" />
              
              <rect x="150" y="69" width="6" height="6" rx="1" />
              <rect x="162" y="69" width="6" height="6" rx="1" />
              <rect x="174" y="69" width="6" height="6" rx="1" />
            </g>
          </g>

          {/* Bridge */}
          <g transform="translate(750, 230)" stroke="#c6dcfb" strokeWidth="4" fill="none">
            <path d="M0,60 Q120,0 240,60" />
            <path d="M24,60 L24,38 M48,60 L48,24 M72,60 L72,13 M96,60 L96,5 M120,60 L120,2 M144,60 L144,5 M168,60 L168,13 M192,60 L192,24 M216,60 L216,38" strokeWidth="2.5" />
            <line x1="0" y1="60" x2="240" y2="60" />
          </g>
          
          {/* Trees */}
          <g transform="translate(620, 210)" fill="#d1e3ff">
             <circle cx="30" cy="50" r="25" />
             <circle cx="10" cy="70" r="18" />
             <circle cx="50" cy="70" r="15" />
          </g>
          <g transform="translate(710, 245)" fill="#d1e3ff">
             <circle cx="20" cy="35" r="15" />
             <circle cx="5" cy="50" r="10" />
             <circle cx="35" cy="50" r="10" />
          </g>
          


          {/* Foreground Waves */}
          <path fill="#e6f0ff" d="M0,210 C320,110 420,280 720,220 C1020,160 1120,320 1440,220 L1440,320 L0,320 Z" opacity="0.9"/>
        </svg>
      </div>
      
      {/* Back to top button */}
      <div className="absolute bottom-8 right-8 z-30 flex items-center gap-3">
        <button 
          onClick={scrollToTop}
          className="w-8 h-8 rounded-full bg-[#e6f0ff] hover:bg-blue-200 text-[#2563eb] flex items-center justify-center transition-colors"
          aria-label="Back to top"
        >
          <ArrowUp size={16} strokeWidth={2.5} />
        </button>
        <span className="text-[13px] font-semibold text-[#0f172a] hidden sm:block">Back to top</span>
      </div>
      
    </footer>
  );
};

export default Footer;

