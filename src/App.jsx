import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

// Citizen components
import Navbar        from './components/Navbar';
import Footer        from './components/Footer';

// Citizen pages
import Home          from './pages/Home';
import ReportIssue   from './pages/ReportIssue';
import ExploreIssues from './pages/ExploreIssues';
import Auth          from './pages/Auth';
import TrackStatus   from './pages/TrackStatus';
import About         from './pages/About';

// Admin pages
import AdminLogin         from './pages/admin/Login';
import AdminDashboard     from './pages/admin/Dashboard';
import AdminReports       from './pages/admin/Reports';
import AdminReportDetails from './pages/admin/ReportDetails';
import AdminDuplicates    from './pages/admin/Duplicates';
import AdminAnalytics     from './pages/admin/Analytics';
import AdminPriority      from './pages/admin/Priority';
import AdminDepartments   from './pages/admin/Departments';

<<<<<<< Updated upstream
// Auth contexts
import { AuthProvider }                    from './context/AuthContext';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';

// ── Admin route guard ─────────────────────────────────────────────────────────
function AdminProtectedRoute({ children }) {
  const { adminUser, loading } = useAdminAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <Loader2 size={32} className="animate-spin text-blue-500" />
    </div>
=======
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="flex-grow flex flex-col"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/report" element={<ReportIssue />} />
          <Route path="/explore" element={<ExploreIssues />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/track" element={<TrackStatus />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
>>>>>>> Stashed changes
  );
  if (!adminUser) return <Navigate to="/admin" replace />;
  return children;
}

// ── Citizen app ───────────────────────────────────────────────────────────────
function CitizenApp() {
  const location = useLocation();
  return (
    <AuthProvider>
      <div className="min-h-screen font-sans bg-white text-gray-900 flex flex-col">
        <Navbar />
        <AnimatePresence mode="wait">
          <motion.div key={location.pathname}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2, ease: 'easeOut' }}
            className="flex-grow flex flex-col"
          >
            <Routes location={location}>
              <Route path="/"        element={<Home />} />
              <Route path="/about"   element={<About />} />
              <Route path="/report"  element={<ReportIssue />} />
              <Route path="/explore" element={<ExploreIssues />} />
              <Route path="/auth"    element={<Auth />} />
              <Route path="/track"   element={<TrackStatus />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
        <Footer />
      </div>
    </AuthProvider>
  );
}

// ── Admin app (no Navbar/Footer) ──────────────────────────────────────────────
function AdminApp() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="/admin"             element={<AdminLogin />} />
        <Route path="/admin/dashboard"   element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
        <Route path="/admin/reports"     element={<AdminProtectedRoute><AdminReports /></AdminProtectedRoute>} />
        <Route path="/admin/reports/:id" element={<AdminProtectedRoute><AdminReportDetails /></AdminProtectedRoute>} />
        <Route path="/admin/duplicates"  element={<AdminProtectedRoute><AdminDuplicates /></AdminProtectedRoute>} />
        <Route path="/admin/analytics"   element={<AdminProtectedRoute><AdminAnalytics /></AdminProtectedRoute>} />
        <Route path="/admin/priority"    element={<AdminProtectedRoute><AdminPriority /></AdminProtectedRoute>} />
        <Route path="/admin/departments" element={<AdminProtectedRoute><AdminDepartments /></AdminProtectedRoute>} />
      </Routes>
    </AdminAuthProvider>
  );
}

// ── Root — split citizen vs admin by URL ──────────────────────────────────────
export default function App() {
  const isAdmin = window.location.pathname.startsWith('/admin');
  return (
    <BrowserRouter>
      {isAdmin ? <AdminApp /> : <CitizenApp />}
    </BrowserRouter>
  );
}
