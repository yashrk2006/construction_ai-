
import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, LineChart, Line, RadialBarChart, RadialBar, PieChart, Pie } from 'recharts';
import { MOCK_TASKS, MOCK_MATERIALS, MOCK_WORKFORCE, COLORS } from '../constants';
import { predictProjectDelay } from '../geminiService';
import { PredictionResult } from '../types';
import RiskHeatmap from '../components/RiskHeatmap';

const Dashboard: React.FC = () => {
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);

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

    // Update clock every second
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: 'Pending Tasks', value: MOCK_TASKS.filter(t => t.status === 'Pending' || t.status === 'Delayed').length, icon: 'fa-triangle-exclamation', color: 'text-red-600', bg: 'bg-red-50', trend: '+3', trendUp: false },
    { label: 'Workforce Active', value: MOCK_WORKFORCE.filter(w => w.attendanceStatus === 'Present').length, icon: 'fa-hard-hat', color: 'text-green-600', bg: 'bg-green-50', trend: '+8', trendUp: true },
    { label: 'Low Inventory', value: MOCK_MATERIALS.filter(m => m.quantity < m.reorderLevel).length, icon: 'fa-box-open', color: 'text-amber-600', bg: 'bg-amber-50', trend: '-2', trendUp: true },
    { label: 'Daily Compliance', value: '96%', icon: 'fa-shield-check', color: 'text-blue-600', bg: 'bg-blue-50', trend: '+2%', trendUp: true },
  ];

  // Enhanced chart data with wider ranges for better visualization
  const chartData = [
    { name: '06:00', progress: 8, workers: 12, efficiency: 35 },
    { name: '07:00', progress: 15, workers: 28, efficiency: 48 },
    { name: '08:00', progress: 28, workers: 45, efficiency: 62 },
    { name: '09:00', progress: 42, workers: 52, efficiency: 71 },
    { name: '10:00', progress: 58, workers: 48, efficiency: 79 },
    { name: '11:00', progress: 67, workers: 54, efficiency: 84 },
    { name: '12:00', progress: 72, workers: 42, efficiency: 81 },
    { name: '13:00', progress: 78, workers: 48, efficiency: 86 },
    { name: '14:00', progress: 85, workers: 51, efficiency: 91 },
    { name: '15:00', progress: 91, workers: 49, efficiency: 94 },
    { name: '16:00', progress: 96, workers: 38, efficiency: 97 },
    { name: '17:00', progress: 100, workers: 22, efficiency: 98 },
  ];

  const projectProgressData = [
    { name: 'Foundation', value: 100, fill: '#10B981' },
    { name: 'Structure', value: 75, fill: '#F5C518' },
    { name: 'MEP', value: 45, fill: '#F97316' },
    { name: 'Finishing', value: 15, fill: '#94A3B8' },
  ];

  const resourceUtilization = [
    { subject: 'Labor', current: 85, max: 100 },
    { subject: 'Equipment', current: 72, max: 100 },
    { subject: 'Materials', current: 68, max: 100 },
    { subject: 'Budget', current: 77, max: 100 },
  ];

  const milestones = [
    { name: 'Foundation Complete', date: '2025-01-15', status: 'completed', progress: 100 },
    { name: 'Floor 1-3 Structure', date: '2025-02-28', status: 'active', progress: 75 },
    { name: 'MEP Installation', date: '2025-03-30', status: 'upcoming', progress: 45 },
    { name: 'Finishing Works', date: '2025-04-30', status: 'upcoming', progress: 15 },
  ];

  const recentActivity = [
    { icon: 'fa-check-circle', text: 'Concrete pour Floor 3 completed', time: '15 mins ago', color: 'text-green-500' },
    { icon: 'fa-truck', text: 'Steel delivery received - 45 tons', time: '1 hour ago', color: 'text-blue-500' },
    { icon: 'fa-exclamation-triangle', text: 'Safety inspection flagged 2 issues', time: '2 hours ago', color: 'text-amber-500' },
    { icon: 'fa-user-plus', text: 'New worker onboarded - Ramesh K.', time: '3 hours ago', color: 'text-purple-500' },
    { icon: 'fa-file-alt', text: 'Daily progress report submitted', time: '4 hours ago', color: 'text-slate-500' },
  ];

  const topPerformers = [
    { name: 'Amit Patel', role: 'Supervisor', score: 98, avatar: 'AP', color: 'bg-blue-500' },
    { name: 'Priya Sharma', role: 'Engineer', score: 96, avatar: 'PS', color: 'bg-purple-500' },
    { name: 'Rajesh Kumar', role: 'Foreman', score: 94, avatar: 'RK', color: 'bg-green-500' },
  ];

  const notifications = [
    { type: 'urgent', title: 'Equipment Maintenance Due', msg: 'Crane #3 requires inspection', time: '10m' },
    { type: 'info', title: 'Weather Alert', msg: 'Heavy rain expected tomorrow', time: '1h' },
    { type: 'success', title: 'Milestone Achieved', msg: 'Floor 3 structure complete', time: '2h' },
  ];

  const quickActions = [
    { icon: 'fa-camera', label: 'Site Photos', color: 'from-blue-500 to-blue-600', action: () => { } },
    { icon: 'fa-clipboard-check', label: 'Create Task', color: 'from-green-500 to-green-600', action: () => { } },
    { icon: 'fa-shield-halved', label: 'Safety Report', color: 'from-amber-500 to-amber-600', action: () => { } },
    { icon: 'fa-truck-loading', label: 'Order Materials', color: 'from-purple-500 to-purple-600', action: () => { } },
  ];

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-top-4 duration rounded">
      {/* Header Bar with Time & Notifications */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-lg p-4 md:p-6 text-white shadow-xl">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-4xl font-industrial font-bold mb-1">Command Center</h1>
            <p className="text-slate-300 text-sm md:text-base flex items-center gap-2">
              <i className="fa-solid fa-building"></i>
              BuildSmart AI Construction Hub
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-sm text-slate-300">Current Time</p>
              <p className="text-2xl font-industrial font-bold text-[#F5C518]">
                {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all relative"
              >
                <i className="fa-solid fa-bell text-xl"></i>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold">3</span>
              </button>

              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)}></div>
                  <div className="absolute right-0 top-14 w-80 bg-white rounded-lg shadow-2xl border border-slate-200 z-50 overflow-hidden">
                    <div className="p-4 bg-slate-800 text-white font-bold border-b border-slate-700">
                      Notifications
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notif, idx) => (
                        <div key={idx} className="p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-bold text-sm text-slate-800">{notif.title}</h4>
                            <span className="text-xs text-slate-400">{notif.time}</span>
                          </div>
                          <p className="text-xs text-slate-600">{notif.msg}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats with Trends */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-4 md:p-5 rounded-lg border-b-4 border-slate-200 shadow-sm hover:shadow-lg hover:border-slate-400 transition-all group">
            <div className="flex justify-between items-start mb-3">
              <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
              <div className={`${stat.bg} ${stat.color} w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <i className={`fa-solid ${stat.icon} text-sm md:text-base`}></i>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl md:text-4xl font-industrial font-bold text-slate-800">{stat.value}</h3>
              <span className={`text-xs font-bold ${stat.trendUp ? 'text-green-600' : 'text-red-600'} flex items-center gap-1`}>
                <i className={`fa-solid fa-arrow-${stat.trendUp ? 'up' : 'down'}`}></i>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
        {/* Left Column - Charts (2 columns) */}
        <div className="xl:col-span-2 space-y-4 md:space-y-6">

          {/* Progress Chart with Multiple Metrics */}
          <div className="bg-white p-4 md:p-6 rounded-lg border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-industrial font-bold text-base md:text-lg text-slate-700 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#F5C518] rounded-full"></span>
                Today's Performance Metrics
              </h3>
              <div className="flex gap-3 text-[10px] font-bold uppercase">
                <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#F5C518]"></span> Progress</div>
                <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Efficiency</div>
                <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Workers</div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                <defs>
                  <linearGradient id="colorProg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F5C518" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#F5C518" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="colorEff" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="colorWorkers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }}
                  dy={8}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }}
                  dx={-8}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '13px',
                    padding: '12px 16px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                  }}
                  labelStyle={{ fontWeight: 'bold', marginBottom: '8px', color: '#F5C518' }}
                  cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '5 5' }}
                />
                <Area
                  type="monotone"
                  dataKey="progress"
                  stroke="#F5C518"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorProg)"
                  dot={{ r: 5, fill: '#F5C518', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 7, fill: '#F5C518', strokeWidth: 3, stroke: '#fff' }}
                />
                <Area
                  type="monotone"
                  dataKey="efficiency"
                  stroke="#3B82F6"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorEff)"
                  dot={{ r: 5, fill: '#3B82F6', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 7, fill: '#3B82F6', strokeWidth: 3, stroke: '#fff' }}
                />
                <Area
                  type="monotone"
                  dataKey="workers"
                  stroke="#10B981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorWorkers)"
                  dot={{ r: 4, fill: '#10B981', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, fill: '#10B981', strokeWidth: 3, stroke: '#fff' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Risk Heatmap - Site Overview */}
          <RiskHeatmap />

          {/* Project Timeline & Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Project Progress Ring */}
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
              <h3 className="font-industrial font-bold text-base mb-4 flex items-center gap-2">
                <i className="fa-solid fa-chart-pie text-blue-500"></i>
                Phase Progress
              </h3>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={projectProgressData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {projectProgressData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {projectProgressData.map((phase, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: phase.fill }}></span>
                    <span className="text-slate-600 font-medium">{phase.name}: {phase.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
              <h3 className="font-industrial font-bold text-base mb-4 flex items-center gap-2">
                <i className="fa-solid fa-bolt text-amber-500"></i>
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={action.action}
                    className={`p-4 bg-gradient-to-br ${action.color} rounded-lg text-white hover:scale-105 transition-transform shadow-lg group`}
                  >
                    <i className={`fa-solid ${action.icon} text-2xl mb-2 block group-hover:scale-110 transition-transform`}></i>
                    <p className="text-xs font-bold">{action.label}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline Milestones */}
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
            <h3 className="font-industrial font-bold text-base mb-6 flex items-center gap-2">
              <i className="fa-solid fa-road text-purple-500"></i>
              Project Milestones
            </h3>
            <div className="space-y-4">
              {milestones.map((milestone, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${milestone.status === 'completed' ? 'bg-green-500' :
                    milestone.status === 'active' ? 'bg-blue-500 animate-pulse' :
                      'bg-slate-300'
                    }`}>
                    <i className={`fa-solid ${milestone.status === 'completed' ? 'fa-check' :
                      milestone.status === 'active' ? 'fa-spinner fa-spin' :
                        'fa-clock'
                      } text-white`}></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-sm text-slate-800">{milestone.name}</h4>
                      <span className="text-xs text-slate-500">{milestone.date}</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${milestone.status === 'completed' ? 'bg-green-500' :
                          milestone.status === 'active' ? 'bg-blue-500' :
                            'bg-slate-300'
                          }`}
                        style={{ width: `${milestone.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-slate-700">{milestone.progress}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar Widgets */}
        <div className="space-y-4 md:space-y-6">

          {/* AI Insight Widget */}
          <div className="bg-[#1A1A1A] rounded-lg overflow-hidden shadow-xl border-b-4 border-[#F5C518]">
            <div className="p-4 bg-[#000] border-b border-white/5 flex items-center justify-between">
              <span className="font-industrial text-[#F5C518] text-sm font-bold flex items-center gap-2">
                <i className="fa-solid fa-brain"></i>
                AI Site Intel
              </span>
              <span className="text-[9px] bg-white/10 text-white/40 px-2 py-0.5 rounded font-bold uppercase">v2.5</span>
            </div>

            <div className="p-6">
              {loadingAI ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-12 h-12 border-4 border-[#F5C518] border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-slate-400 font-industrial text-sm animate-pulse">Analyzing...</p>
                </div>
              ) : prediction ? (
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2">Predicted Delay</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-industrial font-bold text-white tracking-tighter">+{prediction.delayDays}</span>
                      <span className="text-xl font-industrial text-[#F5C518] font-bold uppercase">Days</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] text-slate-500 font-bold uppercase">Risk Score</span>
                      <span className={`text-sm font-bold ${prediction.riskScore > 60 ? 'text-red-500' : 'text-green-500'}`}>{prediction.riskScore}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-1000 ${prediction.riskScore > 60 ? 'bg-red-500' : 'bg-green-500'}`}
                        style={{ width: `${prediction.riskScore}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-lg border border-white/10 relative">
                    <i className="fa-solid fa-quote-left absolute top-2 left-2 text-white/10 text-xl"></i>
                    <p className="text-xs text-slate-400 leading-relaxed italic relative z-10 px-2">
                      {prediction.reasoning}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-slate-600 italic text-sm">
                  Service initialization required
                </div>
              )}

              <button className="mt-8 w-full py-3 bg-[#F5C518] hover:bg-yellow-400 text-[#000] rounded font-industrial font-bold text-sm shadow-[0_4px_0_#C49D13] transition-all active:translate-y-0.5 active:shadow-none">
                Run Mitigation Scenario
              </button>
            </div>

            <div className="h-2 hazard-strip-sm opacity-20"></div>
          </div>

          {/* Top Performers */}
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
            <h3 className="font-industrial font-bold text-base mb-4 flex items-center gap-2">
              <i className="fa-solid fa-trophy text-amber-500"></i>
              Top Performers
            </h3>
            <div className="space-y-3">
              {topPerformers.map((performer, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <div className={`w-12 h-12 ${performer.color} rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0`}>
                    {performer.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-slate-800 truncate">{performer.name}</h4>
                    <p className="text-xs text-slate-500">{performer.role}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-slate-800">{performer.score}</div>
                    <div className="text-[9px] text-slate-400 font-bold uppercase">Score</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
            <h3 className="font-industrial font-bold text-base mb-4 flex items-center gap-2">
              <i className="fa-solid fa-clock-rotate-left text-blue-500"></i>
              Recent Activity
            </h3>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex gap-3 pb-3 border-b border-slate-100 last:border-0">
                  <div className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 ${activity.color}`}>
                    <i className={`fa-solid ${activity.icon} text-xs`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700 leading-tight">{activity.text}</p>
                    <span className="text-[10px] text-slate-400 font-medium">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weather Widget */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-lg shadow-xl text-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-industrial font-bold text-base flex items-center gap-2">
                <i className="fa-solid fa-cloud-sun"></i>
                Site Weather
              </h3>
              <span className="text-xs bg-white/20 px-2 py-1 rounded">Mumbai</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-5xl font-bold">28°</div>
                <p className="text-sm opacity-90 mt-1">Partly Cloudy</p>
              </div>
              <i className="fa-solid fa-cloud-sun text-6xl opacity-80"></i>
            </div>
            <div className="mt-4 pt-4 border-t border-white/20 grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <i className="fa-solid fa-wind block mb-1"></i>
                <span>12 km/h</span>
              </div>
              <div>
                <i className="fa-solid fa-droplet block mb-1"></i>
                <span>65%</span>
              </div>
              <div>
                <i className="fa-solid fa-eye block mb-1"></i>
                <span>10 km</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Critical Tasks & Inventory */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Critical Tasks */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-4 bg-red-50 border-b border-red-100 flex justify-between items-center">
            <h3 className="font-industrial font-bold text-base text-red-900 flex items-center gap-2">
              <i className="fa-solid fa-fire"></i>
              Critical Tasks
            </h3>
            <span className="bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">Urgent</span>
          </div>
          <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
            {MOCK_TASKS.filter(t => t.priority === 'High').map(task => (
              <div key={task.id} className="p-4 hover:bg-slate-50 transition-colors group">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-slate-800 group-hover:text-blue-600 transition-colors">{task.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-1">{task.description}</p>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 ml-2">{task.deadline}</span>
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 transition-all" style={{ width: `${task.progress}%` }}></div>
                  </div>
                  <span className="text-xs font-bold text-slate-700 w-12 text-right">{task.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Inventory Alerts */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-4 bg-amber-50 border-b border-amber-100 flex justify-between items-center">
            <h3 className="font-industrial font-bold text-base text-amber-900 flex items-center gap-2">
              <i className="fa-solid fa-box-open"></i>
              Supply Alerts
            </h3>
            <span className="bg-amber-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">Restock</span>
          </div>
          <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
            {MOCK_MATERIALS.filter(m => m.quantity < m.reorderLevel).map(m => (
              <div key={m.id} className="flex items-center gap-4 bg-amber-50/50 p-3 rounded-lg border border-amber-100 hover:border-amber-200 transition-colors">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-amber-600 shadow-sm border border-amber-100 shrink-0">
                  <i className="fa-solid fa-truck-loading text-lg"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2 mb-1">
                    <span className="text-sm font-bold text-slate-800 truncate">{m.itemName}</span>
                    <span className="text-xs font-bold text-red-600 whitespace-nowrap">{m.quantity} {m.unit}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Reorder: {m.reorderLevel} {m.unit}</div>
                </div>
                <button className="px-4 py-2 bg-[#F5C518] hover:bg-yellow-400 text-[#000] text-xs font-bold rounded-lg uppercase shadow-[0_2px_0_#C49D13] transition-all active:translate-y-0.5 active:shadow-none shrink-0">
                  Order
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
