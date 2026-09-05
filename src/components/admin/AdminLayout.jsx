import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { adminAuth } from '../../lib/firebase';
import {
  LayoutDashboard, FileText, AlertTriangle, Copy,
  BarChart3, Building2, LogOut, Menu, X,
  ShieldCheck, ChevronRight, Bell
} from 'lucide-react';

const NAV = [
  { label: 'Dashboard',      path: '/admin/dashboard',  icon: LayoutDashboard },
  { label: 'All Reports',    path: '/admin/reports',    icon: FileText },
  { label: 'High Priority',  path: '/admin/priority',   icon: AlertTriangle },
  { label: 'Duplicates',     path: '/admin/duplicates', icon: Copy },
  { label: 'Analytics',      path: '/admin/analytics',  icon: BarChart3 },
  { label: 'Departments',    path: '/admin/departments',icon: Building2 },
];

export default function AdminLayout({ children, adminEmail }) {
  const location = useLocation();
  const navigate  = useNavigate();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await signOut(adminAuth);
    navigate('/admin');
  }

  const Sidebar = ({ mobile = false }) => (
    <div className={`flex flex-col h-full ${mobile ? '' : 'w-64'}`}>
      {/* Logo */}
      <div className="px-6 py-5 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
            <ShieldCheck size={20} className="text-white" />
          </div>
          <div>
            <p className="font-extrabold text-white text-sm leading-none">PIRT Admin</p>
            <p className="text-slate-400 text-[11px] mt-0.5">Control Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV.map(({ label, path, icon: Icon }) => {
          const active = location.pathname === path || location.pathname.startsWith(path + '/');
          return (
            <Link key={path} to={path} onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                active
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <Icon size={17} />
              {label}
              {active && <ChevronRight size={14} className="ml-auto opacity-60" />}
            </Link>
          );
        })}
      </nav>

      {/* Admin profile + logout */}
      <div className="px-3 py-4 border-t border-slate-700 space-y-1">
        <div className="flex items-center gap-3 px-3 py-2.5">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
            {adminEmail?.[0]?.toUpperCase() || 'A'}
          </div>
          <div className="min-w-0">
            <p className="text-white text-xs font-bold truncate">{adminEmail || 'Admin'}</p>
            <p className="text-slate-400 text-[11px]">Administrator</p>
          </div>
        </div>
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:bg-red-500/20 hover:text-red-400 transition-all">
          <LogOut size={17} /> Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900 shrink-0">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <aside className="relative w-72 h-full bg-slate-900 flex flex-col">
            <Sidebar mobile />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-4 lg:px-6 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600"
              onClick={() => setOpen(true)}>
              <Menu size={20} />
            </button>
            <div>
              <p className="font-bold text-gray-900 text-sm lg:text-base">
                {NAV.find(n => location.pathname.startsWith(n.path))?.label || 'Admin'}
              </p>
              <p className="text-xs text-gray-400 hidden sm:block">Public Issue Resolution Tracker</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" rel="noreferrer"
              className="text-xs text-blue-600 hover:underline hidden sm:block font-medium">
              ← Citizen Site
            </a>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
