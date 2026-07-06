import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplets, Calendar, CreditCard, History, Star, Shield, LogOut } from 'lucide-react';

const CustomerDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
      <div className="max-w-6xl mx-auto p-6 pt-12 pb-20">
        
        <header className="mb-12 flex justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">My Dashboard</h1>
            <p className="text-slate-400 mt-2">Welcome back, Sarah</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 p-[2px]">
              <div className="w-full h-full rounded-full bg-slate-900 border-2 border-transparent flex items-center justify-center">
                <span className="text-white font-bold">SA</span>
              </div>
            </div>
            <button onClick={handleLogout} className="p-2 bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 rounded-xl transition-all" title="Logout">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Subscription Details */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Shield className="text-blue-400" /> Active Plan
              </h2>
              
              <div className="relative overflow-hidden bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div>
                    <div className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase rounded-full mb-4">
                      Premium Member
                    </div>
                    <h3 className="text-3xl font-bold text-white">Unlimited Shine Plan</h3>
                    <p className="text-slate-400 mt-2">Billed ₹4,999 monthly</p>
                  </div>
                  
                  <div className="text-left md:text-right">
                    <p className="text-sm text-slate-400 mb-1">Next Billing Date</p>
                    <p className="text-xl font-bold text-white flex items-center md:justify-end gap-2">
                      <Calendar className="w-5 h-5 text-blue-400" /> Aug 15, 2026
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-800/50">
                  <div className="text-center p-4 bg-slate-800/40 rounded-2xl">
                    <Droplets className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                    <div className="text-sm text-slate-400">Washes Left</div>
                    <div className="text-xl font-bold text-white">Unlimited</div>
                  </div>
                  <div className="text-center p-4 bg-slate-800/40 rounded-2xl">
                    <Star className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                    <div className="text-sm text-slate-400">Points</div>
                    <div className="text-xl font-bold text-white">1,250</div>
                  </div>
                </div>

                <div className="mt-8 flex gap-4">
                  <button className="px-6 py-3 bg-white text-slate-900 font-medium rounded-xl hover:bg-slate-200 transition-colors shadow-lg shadow-white/10">
                    Upgrade Plan
                  </button>
                  <button className="px-6 py-3 bg-slate-800 text-white font-medium rounded-xl hover:bg-slate-700 border border-slate-700 transition-colors">
                    Manage Billing
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* Wash History */}
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <History className="text-purple-400" /> Recent Washes
              </h2>
              
              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                {[
                  { date: "Jul 01, 2026", type: "Premium Wash", location: "Downtown Bay 2" },
                  { date: "Jun 24, 2026", type: "Basic Wash", location: "Westside Bay 1" },
                  { date: "Jun 10, 2026", type: "Premium Wash", location: "Downtown Bay 4" },
                ].map((wash, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-slate-800/40 rounded-2xl hover:bg-slate-800/60 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-slate-700/50 flex items-center justify-center shrink-0">
                      <Droplets className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{wash.type}</h4>
                      <p className="text-xs text-slate-400 mt-1">{wash.date}</p>
                      <p className="text-xs text-slate-500 mt-1">{wash.location}</p>
                    </div>
                  </div>
                ))}
                
                <button className="w-full py-3 mt-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  View Full History
                </button>
              </div>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
