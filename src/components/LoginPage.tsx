import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight, User, IdCard } from 'lucide-react';
import { toast } from 'sonner';

const LoginPage: React.FC = () => {
  const [collegeId, setCollegeId] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!collegeId.trim() || !nationalId.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    // Simulated login for prototyping
    setTimeout(() => {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('collegeId', collegeId);
      localStorage.setItem('nationalId', nationalId);
      
      toast.success('Login Successful', {
        description: `Welcome back, Student ${collegeId}`,
      });
      
      window.location.href = '/';
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-slate-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-8 bg-emerald-600 text-white text-center space-y-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-sm">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">MyUniPlan</h1>
              <p className="text-emerald-100 text-sm">University Study Plan Manager</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="p-8 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-600" />
                  College ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={collegeId}
                    onChange={(e) => setCollegeId(e.target.value)}
                    placeholder="Enter College ID"
                    className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <IdCard className="w-4 h-4 text-emerald-600" />
                  National ID
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                    placeholder="Enter National ID"
                    className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-[10px] text-slate-400 font-medium italic">Made with dedication</p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="p-6 bg-slate-50 border-t text-center">
            <p className="text-xs text-slate-400">
              Need help? Contact the IT Support Department
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
