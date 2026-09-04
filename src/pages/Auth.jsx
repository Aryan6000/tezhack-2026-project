import { useState } from 'react';
import { LogIn, UserPlus, ArrowRight } from 'lucide-react';


const Auth = () => {
  const [activeTab, setActiveTab] = useState('signin'); // 'signin' or 'register'

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        
        {/* Tabs */}
        <div className="flex border-b border-gray-100 p-2 gap-2 bg-gray-50/50">
          <button
            onClick={() => setActiveTab('signin')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'signin' 
                ? 'bg-white text-slate-900 shadow-sm border border-gray-200' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <LogIn size={18} />
            Sign In
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'register' 
                ? 'bg-white text-slate-900 shadow-sm border border-gray-200' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <UserPlus size={18} />
            Register
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {activeTab === 'signin' ? (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back</h2>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                Access your grievances, inspect ward updates, and verify works.
              </p>

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-colors text-sm placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-sm font-medium text-slate-700">
                      Password
                    </label>
                    <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900 hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-colors text-sm placeholder:text-gray-400"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full mt-6 bg-[#03345f] hover:bg-[#022442] text-white py-3.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  Sign In to Tracker
                  <ArrowRight size={18} />
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-gray-500">
                Don't have an account?{' '}
                <button 
                  onClick={() => setActiveTab('register')}
                  className="font-semibold text-slate-800 hover:text-slate-900 hover:underline"
                >
                  Register now
                </button>
              </p>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Create Account</h2>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                Join the platform to report civic issues and track resolutions.
              </p>

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    placeholder="Sunita R. Deshmukh"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-colors text-sm placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-colors text-sm placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Password
                  </label>
                  <input 
                    type="password" 
                    placeholder="Create a strong password"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-colors text-sm placeholder:text-gray-400"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full mt-6 bg-[#03345f] hover:bg-[#022442] text-white py-3.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  Register Account
                  <UserPlus size={18} />
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-gray-500">
                Already have an account?{' '}
                <button 
                  onClick={() => setActiveTab('signin')}
                  className="font-semibold text-slate-800 hover:text-slate-900 hover:underline"
                >
                  Sign in
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
