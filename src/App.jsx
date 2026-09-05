import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

// Citizen components
import Navbar        from './components/Navbar';
import Footer        from './components/Footer';

// Citizen pages — eagerly loaded (needed on first visit)
import Home          from './pages/Home';
import ExploreIssues from './pages/ExploreIssues';
import Auth          from './pages/Auth';
import TrackStatus   from './pages/TrackStatus';
import About         from './pages/About';
import Profile       from './pages/Profile';

// Heavy pages — lazy loaded
const ReportIssue = lazy(() => import('./pages/ReportIssue'));

// Admin pages — lazy loaded (downloaded only when /admin is visited)
const AdminLogin         = lazy(() => import('./pages/admin/Login'));
const AdminDashboard     = lazy(() => import('./pages/admin/Dashboard'));
const AdminReports       = lazy(() => import('./pages/admin/Reports'));
const AdminReportDetails = lazy(() => import('./pages/admin/ReportDetails'));
const AdminDuplicates    = lazy(() => import('./pages/admin/Duplicates'));
const AdminAnalytics     = lazy(() => import('./pages/admin/Analytics'));
const AdminPriority      = lazy(() => import('./pages/admin/Priority'));
const AdminDepartments   = lazy(() => import('./pages/admin/Departments'));

// Auth contexts
import { AuthProvider }                    from './context/AuthContext';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';

const AdminLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-900">
    <Loader2 size={32} className="animate-spin text-blue-500" />
  </div>
);

// ── Admin route guard ─────────────────────────────────────────────────────────
function AdminProtectedRoute({ children }) {
  const { adminUser, loading } = useAdminAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <Loader2 size={32} className="animate-spin text-blue-500" />
    </div>
  );
  if (!adminUser) return <Navigate to="/admin" replace />;
  return children;
}

// ── Citizen app ───────────────────────────────────────────────────────────────
function CitizenApp() {
  const location = useLocation();
  return (
    <div className="min-h-screen font-sans bg-white text-gray-900 flex flex-col">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.div key={location.pathname}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2, ease: 'easeOut' }}
          className="flex-grow flex flex-col"
        >
          <Routes>
            <Route path="/"        element={<Home />} />
            <Route path="/about"   element={<About />} />
            <Route path="/report"  element={<Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>}><ReportIssue /></Suspense>} />
            <Route path="/explore" element={<ExploreIssues />} />
            <Route path="/auth"    element={<Auth />} />
            <Route path="/track"   element={<TrackStatus />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*"        element={<Navigate to="/" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

// ── Root Router ───────────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <AuthProvider>
          <Routes>
            {/* Admin Portal (Isolated Layout) */}
            <Route path="/admin"             element={<Suspense fallback={<AdminLoader />}><AdminLogin /></Suspense>} />
            <Route path="/admin/dashboard"   element={<AdminProtectedRoute><Suspense fallback={<AdminLoader />}><AdminDashboard /></Suspense></AdminProtectedRoute>} />
            <Route path="/admin/reports"     element={<AdminProtectedRoute><Suspense fallback={<AdminLoader />}><AdminReports /></Suspense></AdminProtectedRoute>} />
            <Route path="/admin/reports/:id" element={<AdminProtectedRoute><Suspense fallback={<AdminLoader />}><AdminReportDetails /></Suspense></AdminProtectedRoute>} />
            <Route path="/admin/duplicates"  element={<AdminProtectedRoute><Suspense fallback={<AdminLoader />}><AdminDuplicates /></Suspense></AdminProtectedRoute>} />
            <Route path="/admin/analytics"   element={<AdminProtectedRoute><Suspense fallback={<AdminLoader />}><AdminAnalytics /></Suspense></AdminProtectedRoute>} />
            <Route path="/admin/priority"    element={<AdminProtectedRoute><Suspense fallback={<AdminLoader />}><AdminPriority /></Suspense></AdminProtectedRoute>} />
            <Route path="/admin/departments" element={<AdminProtectedRoute><Suspense fallback={<AdminLoader />}><AdminDepartments /></Suspense></AdminProtectedRoute>} />

            {/* Citizen Website */}
            <Route path="/*" element={<CitizenApp />} />
          </Routes>
        </AuthProvider>
      </AdminAuthProvider>
    </BrowserRouter>
  );
}
