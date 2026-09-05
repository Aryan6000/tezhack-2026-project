import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { adminAuth, adminDb } from '../../lib/firebase';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { ShieldCheck, Mail, Lock, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { adminUser, loading: authLoading } = useAdminAuth();
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  useEffect(() => {
    if (!authLoading && adminUser) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [adminUser, authLoading, navigate]);

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(adminAuth, email, password);

      // Check role in Firestore — must be "admin"
      try {
        const snap = await getDoc(doc(adminDb, 'users', user.uid));
        if (!snap.exists()) {
          await adminAuth.signOut();
          setError(`No profile found in Firestore for UID (${user.uid}). Please create a document in 'users' collection with role: "admin".`);
          setLoading(false);
          return;
        }
        if (snap.data()?.role !== 'admin') {
          await adminAuth.signOut();
          setError(`Access denied. Account has role "${snap.data()?.role || 'none'}", but "admin" is required.`);
          setLoading(false);
          return;
        }
      } catch (firestoreErr) {
        await adminAuth.signOut();
        setError(`Could not verify admin role: ${firestoreErr.message}. Ensure your Firebase Firestore Security Rules allow read access to /users/${user.uid}.`);
        setLoading(false);
        return;
      }

      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      const map = {
        'auth/invalid-credential': 'Invalid email or password.',
        'auth/user-not-found':     'No account found with this email.',
        'auth/wrong-password':     'Incorrect password.',
        'auth/too-many-requests':  'Too many attempts. Try again later.',
      };
      setError(map[err.code] || 'Login failed. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/30">
            <ShieldCheck size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-white mb-1">Admin Portal</h1>
          <p className="text-slate-400 text-sm">Public Issue Resolution Tracker</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Administrator Login</h2>
          <p className="text-gray-500 text-sm mb-6">Restricted access. Authorized personnel only.</p>

          {error && (
            <div className="mb-5 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
              <AlertCircle size={16} className="shrink-0" /> {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors"
            >
              {loading ? <><Loader2 size={16} className="animate-spin" /> Verifying...</> : 'Sign In to Admin Panel'}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-gray-100 text-center">
            <a href="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
              ← Back to main website
            </a>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          This portal is monitored. Unauthorized access attempts are logged.
        </p>
      </div>
    </div>
  );
}
