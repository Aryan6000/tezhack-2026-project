import { useState } from 'react';
import { Building2, Menu, X, Search, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logOut } = useAuth();
  const handleSignOut = async () => { await logOut(); navigate('/'); };

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
        <div className="flex items-center justify-between h-[76px]">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <img src="/logo.png" alt="PIRT Logo" className="h-9 w-auto object-contain" />
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-wide text-slate-900 leading-none mb-0.5">PIRT</span>
              <span className="text-[10px] text-gray-500 font-medium leading-none">Cleaner Cities. Stronger Citizens.</span>
            </div>
          </Link>

          {/* Nav Links — Desktop */}
          <div className="hidden md:flex flex-1 justify-center items-center">
            <div className="flex items-center space-x-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
                return (
                  <Link key={link.name} to={link.path}
                    className={`relative px-4 py-6 text-[15px] font-semibold transition-colors ${isActive ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span layoutId="nav-underline"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-600 rounded-t-full"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Actions — Desktop */}
          <div className="hidden md:flex items-center space-x-5 shrink-0">
            <button className="text-slate-400 hover:text-blue-600 transition-colors">
              <Search size={20} />
            </button>
            <div className="h-5 w-px bg-gray-200" />

            {user ? (
              <div className="relative">
                <button onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
                >
                  <User size={16} />
                  <span className="max-w-[120px] truncate">{user.displayName || user.email?.split('@')[0]}</span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                    <button onClick={() => { setUserMenuOpen(false); handleSignOut(); }}
                      className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={15} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/auth" className="text-slate-600 text-sm font-semibold hover:text-blue-600 transition-colors">
                Log in
              </Link>
            )}

            <Link to="/report" className="bg-[#2563eb] hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm flex items-center gap-1.5">
              File Report <ArrowRight size={16} />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="p-2 text-slate-600 hover:text-blue-600 transition-colors rounded-md relative w-10 h-10 flex items-center justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }} className="absolute">
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }} className="absolute">
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="md:hidden border-t border-gray-100 bg-white absolute w-full shadow-lg overflow-hidden"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
                return (
                  <Link key={link.name} to={link.path}
                    className={`block px-3 py-3 text-base font-semibold rounded-lg ${isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-blue-50 hover:text-blue-600'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="border-t border-gray-100 mt-4 pt-4 flex flex-col gap-3">
                {user ? (
                  <button onClick={() => { setMobileMenuOpen(false); handleSignOut(); }}
                    className="flex items-center justify-center gap-2 px-3 py-2 text-base font-semibold text-red-600"
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                ) : (
                  <Link to="/auth" className="block px-3 py-2 text-base font-semibold text-slate-600 hover:text-blue-600 text-center" onClick={() => setMobileMenuOpen(false)}>
                    Log in
                  </Link>
                )}
                <Link to="/report" className="w-full bg-[#2563eb] text-white px-4 py-3 rounded-full text-base font-medium text-center hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center gap-1.5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  File Report <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {userMenuOpen && <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />}
    </nav>
  );
};

export default Navbar;
