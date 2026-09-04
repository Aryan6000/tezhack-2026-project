import { useState } from 'react';
import { Building2, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Report', path: '/report' },
    { name: 'Explore', path: '/explore' },
    { name: 'Track Status', path: '/track' },
    { name: 'About', path: '#' },
  ];

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-gray-100/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          
          {/* Logo - Left */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <Building2 size={24} className="text-slate-900" strokeWidth={2.5} />
            <span className="font-bold text-lg tracking-wide text-slate-900">PIRT</span>
          </Link>
          
          {/* Nav Links - Center (Desktop) */}
          <div className="hidden md:flex flex-1 justify-center items-center">
            <div className="flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
                
                return (
                  <Link 
                    key={link.name}
                    to={link.path} 
                    className={`relative px-4 py-6 text-sm font-semibold transition-colors ${
                      isActive 
                        ? 'text-slate-900' 
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-slate-900 rounded-t-full"></span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Actions - Right (Desktop) */}
          <div className="hidden md:flex items-center space-x-6 shrink-0">
            <Link to="/auth" className="text-slate-600 text-sm font-semibold hover:text-slate-900 transition-colors">
              Log in
            </Link>
            <Link to="/report" className="bg-slate-900 hover:bg-black text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm">
              File Report
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              className="p-2 text-slate-600 hover:text-slate-900 transition-colors rounded-md"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
              return (
                <Link 
                  key={link.name}
                  to={link.path} 
                  className={`block px-3 py-3 text-base font-semibold rounded-lg ${
                    isActive 
                      ? 'bg-slate-50 text-slate-900' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
            
            <div className="border-t border-gray-100 mt-4 pt-4 flex flex-col gap-3">
              <Link 
                to="/auth" 
                className="block px-3 py-2 text-base font-semibold text-slate-600 hover:text-slate-900 text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log in
              </Link>
              <Link 
                to="/report" 
                className="w-full bg-slate-900 text-white px-4 py-3 rounded-lg text-base font-semibold text-center hover:bg-black transition-colors shadow-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                File Report
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
