import { useState } from 'react';
import { Building2, FileText, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <Building2 size={24} />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">Public Issue Resolution Tracker</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Official Municipal Redressal Portal</p>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-900 font-medium">Home</Link>
            <Link to="/report" className="text-gray-500 hover:text-gray-900">Report an Issue</Link>
            <Link to="/explore" className="text-gray-500 hover:text-gray-900">Explore Issues</Link>
            <Link to="#" className="text-gray-500 hover:text-gray-900">Track Status</Link>
            <Link to="#" className="text-gray-500 hover:text-gray-900">About</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/auth" className="text-gray-600 font-medium hover:text-slate-900 transition-colors">
              Sign In
            </Link>
            <Link to="/report" className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-md font-medium flex items-center gap-2">
              <FileText size={16} />
              Report Issue
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button 
              className="p-2 text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 text-base font-medium text-gray-900">Home</Link>
            <Link to="/report" className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900">Report an Issue</Link>
            <Link to="/explore" className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900">Explore Issues</Link>
            <Link to="#" className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900">Track Status</Link>
            <Link to="#" className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900">About</Link>
            <Link to="/auth" className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900 border-t border-gray-100 mt-2 pt-4">Sign In / Register</Link>
            <Link to="/report" className="mt-2 w-full bg-slate-900 text-white px-4 py-2 rounded-md font-medium flex items-center justify-center gap-2">
              <FileText size={16} />
              Report Issue
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

