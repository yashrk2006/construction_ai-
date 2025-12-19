
import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { MOCK_TASKS, MOCK_MATERIALS, MOCK_WORKFORCE, COLORS } from '../constants';
import { predictProjectDelay } from '../geminiService';
import { PredictionResult } from '../types';

const Dashboard: React.FC = () => {
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    const fetchAI = async () => {
      setLoadingAI(true);
      try {
        const res = await predictProjectDelay(MOCK_TASKS, MOCK_MATERIALS);
        setPrediction(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingAI(false);
      }
    };
    fetchAI();
  }, []);

  const stats = [
    { label: 'Pending Tasks', value: MOCK_TASKS.filter(t => t.status === 'Pending' || t.status === 'Delayed').length, icon: 'fa-triangle-exclamation', color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Workforce Active', value: MOCK_WORKFORCE.filter(w => w.attendanceStatus === 'Present').length, icon: 'fa-hard-hat', color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Low Inventory', value: MOCK_MATERIALS.filter(m => m.quantity < m.reorderLevel).length, icon: 'fa-box-open', color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Daily Compliance', value: '96%', icon: 'fa-shield-check', color: 'text-blue-600', bg: 'bg-blue-50' },
  ];

  const chartData = [
    { name: '07:00', progress: 10, workers: 8 },
    { name: '09:00', progress: 25, workers: 42 },
    { name: '11:00', progress: 45, workers: 45 },
    { name: '13:00', progress: 52, workers: 38 },
    { name: '15:00', progress: 68, workers: 44 },
    { name: '17:00', progress: 75, workers: 12 },
  ];

  return (
    <div className="space-y-4 md:space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
      {/* Top Section: Quick Stats & AI Prediction */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-3 md:gap-6">
        {/* Stat Cards */}
        <div className="xl:col-span-3 grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-3 md:p-5 rounded border-b-4 border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-400 transition-all">
              <div className="flex justify-between items-start mb-2 md:mb-4">
                <span className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest line-clamp-2">{stat.label}</span>
                <div className={`${stat.bg} ${stat.color} w-6 h-6 md:w-8 md:h-8 rounded flex items-center justify-center shrink-0`}>
                  <i className={`fa-solid ${stat.icon} text-xs md:text-sm`}></i>
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-industrial font-bold text-slate-800">{stat.value}</h3>
            </div>
          ))}

          {/* Progress Chart */}
          <div className="col-span-2 lg:col-span-4 bg-white p-3 md:p-6 rounded border-b-4 border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 md:mb-6 gap-2">
              <h3 className="font-industrial font-bold text-sm md:text-base text-slate-700 flex items-center gap-2">
                <span className="w-1 md:w-1.5 h-4 md:h-6 bg-[#F5C518] rounded-full"></span>
                <span className="truncate">Daily Productivity</span>
              </h3>
              <div className="flex gap-2 md:gap-4 text-[8px] md:text-[10px] font-bold uppercase tracking-tighter">
                <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#F5C518]"></span> Progress</div>
                <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#3C3C3C]"></span> Workforce</div>
              </div>
            </div>
            <div className="h-48 md:h-56 w-full overflow-hidden">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorProg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F5C518" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#F5C518" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 9 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 9 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', border: 'none', borderRadius: '4px', color: '#fff', fontSize: '11px' }} />
                  <Area type="monotone" dataKey="progress" stroke="#F5C518" strokeWidth={2} fillOpacity={1} fill="url(#colorProg)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* AI Insight Sidebar Widget */}
        <div className="bg-[#1A1A1A] rounded overflow-hidden flex flex-col shadow-xl border-b-4 border-[#F5C518]">
          <div className="p-3 md:p-4 bg-[#000] border-b border-white/5 flex items-center justify-between">
            <span className="font-industrial text-[#F5C518] text-xs md:text-sm font-bold flex items-center gap-2">
              <i className="fa-solid fa-brain"></i>
              <span className="hidden sm:inline">AI Site Intel</span>
              <span className="sm:hidden">AI Intel</span>
            </span>
            <span className="text-[8px] md:text-[9px] bg-white/10 text-white/40 px-2 py-0.5 rounded font-bold uppercase">v2.5</span>
          </div>

          <div className="flex-1 p-4 md:p-6 flex flex-col">
            {loadingAI ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 md:space-y-4">
                <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-[#F5C518] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-400 font-industrial text-xs md:text-sm animate-pulse">Scanning...</p>
              </div>
            ) : prediction ? (
              <div className="space-y-4 md:space-y-6">
                <div>
                  <p className="text-[8px] md:text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Predicted Delay</p>
                  <div className="flex items-baseline gap-1 md:gap-2">
                    <span className="text-4xl md:text-6xl font-industrial font-bold text-white tracking-tighter">+{prediction.delayDays}</span>
                    <span className="text-lg md:text-xl font-industrial text-[#F5C518] font-bold uppercase">Days</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-[8px] md:text-[10px] text-slate-500 font-bold uppercase">Risk Score</span>
                    <span className={`text-xs md:text-sm font-bold ${prediction.riskScore > 60 ? 'text-red-500' : 'text-green-500'}`}>{prediction.riskScore}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-1000 ${prediction.riskScore > 60 ? 'bg-red-500' : 'bg-green-500'}`}
                      style={{ width: `${prediction.riskScore}%` }}
                    ></div>
                  </div>
                </div>

                <div className="p-3 md:p-4 bg-white/5 rounded border border-white/10 relative">
                  <i className="fa-solid fa-quote-left absolute top-2 left-2 text-white/10 text-lg md:text-xl"></i>
                  <p className="text-[10px] md:text-xs text-slate-400 leading-relaxed italic relative z-10 px-1 md:px-2">
                    {prediction.reasoning}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-600 italic text-xs md:text-sm">
                Service initialization required
              </div>
            )}

            <button className="mt-6 md:mt-8 w-full py-2.5 md:py-3 bg-[#F5C518] hover:bg-yellow-400 text-[#000] rounded font-industrial font-bold text-xs md:text-sm shadow-[0_3px_0_#C49D13] md:shadow-[0_4px_0_#C49D13] transition-all active:translate-y-0.5 active:shadow-none">
              <span className="hidden sm:inline">Run Mitigation Scenario</span>
              <span className="sm:hidden">Mitigation</span>
            </button>
          </div>

          {/* Animated Background Decoration */}
          <div className="h-2 hazard-strip-sm opacity-20"></div>
        </div>
      </div>

      {/* Second Row: Critical Tasks & Inventory */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
        {/* Critical Tasks */}
        <div className="bg-white rounded border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-3 md:p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center gap-2">
            <h3 className="font-industrial font-bold text-sm md:text-base text-slate-800 truncate">Critical Tasks</h3>
            <span className="bg-red-100 text-red-700 text-[8px] md:text-[10px] font-bold px-2 py-0.5 rounded uppercase whitespace-nowrap">Immediate</span>
          </div>
          <div className="divide-y divide-slate-100">
            {MOCK_TASKS.filter(t => t.priority === 'High').map(task => (
              <div key={task.id} className="p-3 md:p-4 hover:bg-slate-50 transition-colors group">
                <div className="flex justify-between items-start mb-2 gap-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm md:text-base text-slate-800 group-hover:text-blue-600 transition-colors truncate">{task.title}</h4>
                    <p className="text-[10px] md:text-xs text-slate-500 line-clamp-1 mt-0.5">{task.description}</p>
                  </div>
                  <span className="text-[8px] md:text-[10px] font-bold text-slate-400 shrink-0">{task.deadline}</span>
                </div>
                <div className="flex items-center gap-2 md:gap-4 mt-3 md:mt-4">
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: `${task.progress}%` }}></div>
                  </div>
                  <span className="text-[9px] md:text-[10px] font-bold text-slate-700 w-8 text-right">{task.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Inventory */}
        <div className="bg-white rounded border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-3 md:p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center gap-2">
            <h3 className="font-industrial font-bold text-sm md:text-base text-slate-800 truncate">Supply Alerts</h3>
            <span className="bg-amber-100 text-amber-700 text-[8px] md:text-[10px] font-bold px-2 py-0.5 rounded uppercase whitespace-nowrap">Audit</span>
          </div>
          <div className="p-3 md:p-4 space-y-3 md:space-y-4">
            {MOCK_MATERIALS.filter(m => m.quantity < m.reorderLevel).map(m => (
              <div key={m.id} className="flex items-center gap-2 md:gap-4 bg-amber-50/50 p-2.5 md:p-3 rounded border border-amber-100">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded flex items-center justify-center text-amber-600 shadow-sm border border-amber-100 shrink-0">
                  <i className="fa-solid fa-truck-loading text-xs md:text-base"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <span className="text-xs md:text-sm font-bold text-slate-800 truncate">{m.itemName}</span>
                    <span className="text-[10px] md:text-xs font-bold text-red-600 whitespace-nowrap">{m.quantity} {m.unit}</span>
                  </div>
                  <div className="text-[8px] md:text-[10px] text-slate-500 font-bold uppercase mt-0.5 md:mt-1 truncate">Reorder: {m.reorderLevel} {m.unit}</div>
                </div>
                <button className="px-2 md:px-3 py-1 md:py-1.5 bg-[#F5C518] text-[#000] text-[9px] md:text-[10px] font-bold rounded uppercase shadow-[0_2px_0_#C49D13] shrink-0 whitespace-nowrap">Order</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
