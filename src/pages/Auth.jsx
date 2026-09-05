import { useState } from 'react';
import { LogIn, UserPlus, ArrowRight, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Auth = () => {
  const [activeTab, setActiveTab] = useState('signin');
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  // Sign in state
  const [signInEmail, setSignInEmail]       = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signInLoading, setSignInLoading]   = useState(false);
  const [signInError, setSignInError]       = useState('');

  // Register state
  const [regName, setRegName]         = useState('');
  const [regEmail, setRegEmail]       = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regLoading, setRegLoading]   = useState(false);
  const [regError, setRegError]       = useState('');
  const [regSuccess, setRegSuccess]   = useState(false);

  async function handleSignIn(e) {
    e.preventDefault();
    setSignInError('');
    setSignInLoading(true);
    try {
      await signIn(signInEmail, signInPassword);
      navigate(from, { replace: true });
    } catch (err) {
      setSignInError(friendlyError(err.code));
    } finally {
      setSignInLoading(false);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    setRegError('');
    if (regPassword.length < 6) {
      setRegError('Password must be at least 6 characters.');
      return;
    }
    setRegLoading(true);
    try {
      await signUp(regEmail, regPassword, regName);
      setRegSuccess(true);
    } catch (err) {
      setRegError(friendlyError(err.code));
    } finally {
      setRegLoading(false);
    }
  }

  function friendlyError(code) {
    const map = {
      'auth/invalid-credential':       'Invalid email or password.',
      'auth/user-not-found':           'No account found with this email.',
      'auth/wrong-password':           'Incorrect password.',
      'auth/email-already-in-use':     'An account with this email already exists.',
      'auth/invalid-email':            'Please enter a valid email address.',
      'auth/weak-password':            'Password must be at least 6 characters.',
      'auth/too-many-requests':        'Too many attempts. Please try again later.',
      'auth/network-request-failed':   'Network error. Check your connection.',
    };
    return map[code] || 'Something went wrong. Please try again.';
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">

        {/* Tabs — design unchanged */}
        <div className="flex border-b border-gray-100 p-2 gap-2 bg-gray-50/50">
          <button
            onClick={() => setActiveTab('signin')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'signin'
              ? 'bg-white text-blue-600 shadow-sm border border-gray-200'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <LogIn size={18} />
            Sign In
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'register'
              ? 'bg-white text-blue-600 shadow-sm border border-gray-200'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <UserPlus size={18} />
            Register
          </button>
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'signin' ? (
              <motion.div
                key="signin"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back</h2>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                  Access your grievances, inspect ward updates, and verify works.
                </p>

                {signInError && (
                  <div className="mb-5 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
                    <AlertCircle size={16} className="shrink-0" />
                    {signInError}
                  </div>
                )}

                <form className="space-y-5" onSubmit={handleSignIn}>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors text-sm placeholder:text-gray-400"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-sm font-medium text-slate-700">Password</label>
                      <a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600 hover:underline transition-colors">
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••"
                        value={signInPassword}
                        onChange={(e) => setSignInPassword(e.target.value)}
                        className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors text-sm placeholder:text-gray-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={signInLoading}
                    className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    {signInLoading ? 'Signing in…' : (<>Sign In to Tracker <ArrowRight size={18} /></>)}
                  </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-500">
                  Don't have an account?{' '}
                  <button onClick={() => setActiveTab('register')} className="font-semibold text-slate-800 hover:text-blue-600 hover:underline transition-colors">
                    Register now
                  </button>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Create Account</h2>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                  Join the platform to report civic issues and track resolutions.
                </p>

                {regSuccess ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                    <div className="text-green-600 font-bold text-lg mb-2">Account Created!</div>
                    <p className="text-gray-500 text-sm mb-4">You can now sign in with your credentials.</p>
                    <button
                      onClick={() => { setActiveTab('signin'); setRegSuccess(false); }}
                      className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-700"
                    >
                      Go to Sign In
                    </button>
                  </div>
                ) : (
                  <>
                    {regError && (
                      <div className="mb-5 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
                        <AlertCircle size={16} className="shrink-0" />
                        {regError}
                      </div>
                    )}

                    <form className="space-y-5" onSubmit={handleRegister}>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Your full name"
                          value={regName}
                          onChange={(e) => setRegName(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors text-sm placeholder:text-gray-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                        <input
                          type="email"
                          required
                          placeholder="name@example.com"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors text-sm placeholder:text-gray-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            placeholder="At least 6 characters"
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                            className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors text-sm placeholder:text-gray-400"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={regLoading}
                        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
                      >
                        {regLoading ? 'Creating account…' : (<>Register Account <UserPlus size={18} /></>)}
                      </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-500">
                      Already have an account?{' '}
                      <button onClick={() => setActiveTab('signin')} className="font-semibold text-slate-800 hover:text-blue-600 hover:underline transition-colors">
                        Sign in
                      </button>
                    </p>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Auth;
