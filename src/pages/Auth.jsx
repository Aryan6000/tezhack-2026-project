import { useState } from 'react';
import { LogIn, UserPlus, ArrowRight, Eye, EyeOff, AlertCircle, Mail, Lock, MapPin } from 'lucide-react';
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
    <div className="min-h-[calc(100vh-76px)] bg-[#f4f8ff] relative flex items-center justify-center lg:justify-end lg:pr-[15%] p-4 overflow-hidden">
      
      {/* Background Decor (Image & Floating Card) */}
      <div className="absolute inset-0 z-0 hidden lg:block overflow-hidden">
        {/* Left Side Image */}
        <div 
          className="absolute top-0 left-0 w-[55%] h-full bg-no-repeat bg-cover bg-left"
          style={{ 
            backgroundImage: 'url(/hero-image.webp)',
            maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)'
          }}
        />
        
        {/* Floating Decor Badge */}
        <div className="absolute top-[30%] left-[25%] bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-2xl flex items-center gap-4 w-[240px] border border-white/50 animate-[float_4s_ease-in-out_infinite]">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
            <MapPin size={20} strokeWidth={2.5} />
          </div>
          <div>
            <div className="font-extrabold text-slate-900 text-sm">Stronger Communities</div>
            <div className="text-[12px] text-slate-500 font-medium">Brighter Tomorrows</div>
          </div>
        </div>
      </div>

      {/* Auth Card */}
      <div className="bg-white w-full max-w-[440px] rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white relative z-10 overflow-hidden">
        
        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setActiveTab('signin')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 text-[15px] font-bold transition-all border-b-2 ${activeTab === 'signin'
              ? 'text-blue-600 border-blue-600 bg-white'
              : 'text-gray-400 border-transparent hover:text-gray-600 bg-gray-50/30'
            }`}
          >
            <LogIn size={18} /> Sign In
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 text-[15px] font-bold transition-all border-b-2 ${activeTab === 'register'
              ? 'text-blue-600 border-blue-600 bg-white'
              : 'text-gray-400 border-transparent hover:text-gray-600 bg-gray-50/30'
            }`}
          >
            <UserPlus size={18} /> Register
          </button>
        </div>

        <div className="p-8 sm:p-10">
          <AnimatePresence mode="wait">
            {activeTab === 'signin' ? (
              <motion.div
                key="signin"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-[24px] font-extrabold text-[#0f172a] mb-2 tracking-tight">Welcome Back</h2>
                  <p className="text-gray-500 text-[14px] leading-relaxed max-w-xs mx-auto font-medium">
                    Access your grievances, inspect ward updates, and verify works.
                  </p>
                </div>

                {signInError && (
                  <div className="mb-6 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-[14px] font-medium">
                    <AlertCircle size={16} className="shrink-0" />
                    {signInError}
                  </div>
                )}

                <form className="space-y-5" onSubmit={handleSignIn}>
                  <div>
                    <label className="block text-[14px] font-bold text-slate-800 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={signInEmail}
                        onChange={(e) => setSignInEmail(e.target.value)}
                        className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-[15px] font-medium placeholder:text-gray-400 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[14px] font-bold text-slate-800 mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Enter your password"
                        value={signInPassword}
                        onChange={(e) => setSignInPassword(e.target.value)}
                        className="w-full pl-11 pr-12 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-[15px] font-medium placeholder:text-gray-400 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-slate-700 transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-1">
                    <label className="flex items-center gap-2.5 cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-[6px] checked:bg-[#2563eb] checked:border-[#2563eb] transition-all cursor-pointer" />
                        <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      <span className="text-[14px] font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">Keep me signed in</span>
                    </label>
                    <a href="#" className="text-[14px] font-bold text-[#2563eb] hover:text-blue-700 hover:underline transition-colors">
                      Forgot password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    disabled={signInLoading}
                    className="w-full mt-2 bg-[#2563eb] hover:bg-blue-700 disabled:opacity-60 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/20 active:scale-[0.98]"
                  >
                    {signInLoading ? 'Signing in…' : (<>Sign In to Tracker <ArrowRight size={18} strokeWidth={2.5} /></>)}
                  </button>
                </form>



                <p className="text-center text-[14px] font-medium text-gray-500">
                  Don't have an account?{' '}
                  <button onClick={() => setActiveTab('register')} className="font-bold text-[#2563eb] hover:text-blue-700 hover:underline transition-colors">
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
                <div className="text-center mb-8">
                  <h2 className="text-[24px] font-extrabold text-[#0f172a] mb-2 tracking-tight">Create Account</h2>
                  <p className="text-gray-500 text-[14px] leading-relaxed max-w-xs mx-auto font-medium">
                    Join the platform to report civic issues and track resolutions.
                  </p>
                </div>

                {regSuccess ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <UserPlus size={24} />
                    </div>
                    <div className="text-emerald-700 font-extrabold text-lg mb-2">Account Created!</div>
                    <p className="text-emerald-600/80 text-[14px] font-medium mb-6">You can now sign in with your credentials.</p>
                    <button
                      onClick={() => { setActiveTab('signin'); setRegSuccess(false); }}
                      className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold text-[15px] hover:bg-emerald-700 transition-colors shadow-sm"
                    >
                      Go to Sign In
                    </button>
                  </div>
                ) : (
                  <>
                    {regError && (
                      <div className="mb-6 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-[14px] font-medium">
                        <AlertCircle size={16} className="shrink-0" />
                        {regError}
                      </div>
                    )}

                    <form className="space-y-4" onSubmit={handleRegister}>
                      <div>
                        <label className="block text-[14px] font-bold text-slate-800 mb-2">Full Name</label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="Your full name"
                            value={regName}
                            onChange={(e) => setRegName(e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-[15px] font-medium placeholder:text-gray-400 outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[14px] font-bold text-slate-800 mb-2">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type="email"
                            required
                            placeholder="name@example.com"
                            value={regEmail}
                            onChange={(e) => setRegEmail(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-[15px] font-medium placeholder:text-gray-400 outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[14px] font-bold text-slate-800 mb-2">Password</label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            placeholder="At least 6 characters"
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                            className="w-full pl-11 pr-12 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-[15px] font-medium placeholder:text-gray-400 outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-slate-700 transition-colors"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={regLoading}
                        className="w-full mt-6 bg-[#2563eb] hover:bg-blue-700 disabled:opacity-60 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/20 active:scale-[0.98]"
                      >
                        {regLoading ? 'Creating account…' : (<>Register Account <UserPlus size={18} strokeWidth={2.5} /></>)}
                      </button>
                    </form>

                    <p className="mt-8 text-center text-[14px] font-medium text-gray-500">
                      Already have an account?{' '}
                      <button onClick={() => setActiveTab('signin')} className="font-bold text-[#2563eb] hover:text-blue-700 hover:underline transition-colors">
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
