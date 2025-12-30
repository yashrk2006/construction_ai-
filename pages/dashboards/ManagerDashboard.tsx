import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_TASKS, MOCK_MATERIALS, MOCK_WORKFORCE } from '../../constants';
import { predictProjectDelay } from '../../geminiService';
import { PredictionResult } from '../../types';

interface DashboardConfig {
    type: string;
    title: string;
    description: string;
    primaryColor: string;
    widgets: string[];
}

interface ManagerDashboardProps {
    config: DashboardConfig;
}

/**
 * Project Manager Dashboard
 * Project planning and resource management focus
 */
const ManagerDashboard: React.FC<ManagerDashboardProps> = ({ config }) => {
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

    const managerStats = [
        { label: 'Active Tasks', value: MOCK_TASKS.filter(t => t.status === 'In Progress').length, icon: 'fa-clipboard-list', color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Team Members', value: MOCK_WORKFORCE.length, icon: 'fa-users', color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Low Stock Items', value: MOCK_MATERIALS.filter(m => m.quantity < m.reorderLevel).length, icon: 'fa-box-open', color: 'text-amber-600', bg: 'bg-amber-50' },
        { label: 'Compliance', value: '96%', icon: 'fa-shield-check', color: 'text-purple-600', bg: 'bg-purple-50' },
    ];

    const productivityData = [
        { day: 'Mon', tasks: 12, completed: 9 },
        { day: 'Tue', tasks: 15, completed: 13 },
        { day: 'Wed', tasks: 14, completed: 11 },
        { day: 'Thu', tasks: 16, completed: 14 },
        { day: 'Fri', tasks: 13, completed: 12 },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Manager Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white shadow-xl">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-industrial font-bold mb-2">{config.title}</h2>
                        <p className="text-blue-100">{config.description}</p>
                    </div>
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                        <i className="fa-solid fa-briefcase text-3xl"></i>
                    </div>
                </div>
            </div>

            {/* Manager Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {managerStats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-lg border-b-4 border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
                            <div className={`${stat.bg} ${stat.color} w-8 h-8 rounded flex items-center justify-center`}>
                                <i className={`fa-solid ${stat.icon} text-sm`}></i>
                            </div>
                        </div>
                        <h3 className="text-3xl font-industrial font-bold text-slate-800">{stat.value}</h3>
                    </div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                {/* Team Productivity Chart */}
                <div className="xl:col-span-3 bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
                    <h3 className="font-industrial font-bold text-lg mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
                        Weekly Performance
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={productivityData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                            <YAxis tick={{ fontSize: 11 }} />
                            <Tooltip />
                            <Area type="monotone" dataKey="tasks" stroke="#3B82F6" fill="#DBEAFE" strokeWidth={2} />
                            <Area type="monotone" dataKey="completed" stroke="#10B981" fill="#D1FAE5" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* AI Insights */}
                <div className="bg-[#1A1A1A] rounded-lg overflow-hidden shadow-xl border-b-4 border-[#F5C518]">
                    <div className="p-4 bg-[#000] border-b border-white/5">
                        <span className="font-industrial text-[#F5C518] text-sm font-bold flex items-center gap-2">
                            <i className="fa-solid fa-brain"></i>
                            AI Intel
                        </span>
                    </div>
                    <div className="p-6">
                        {loadingAI ? (
                            <div className="flex flex-col items-center justify-center py-8">
                                <div className="w-10 h-10 border-4 border-[#F5C518] border-t-transparent rounded-full animate-spin mb-3"></div>
                                <p className="text-slate-400 text-xs">Analyzing...</p>
                            </div>
                        ) : prediction ? (
                            <div className="space-y-4">
                                <div>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Risk Assessment</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-industrial font-bold text-white">+{prediction.delayDays}</span>
                                        <span className="text-lg font-industrial text-[#F5C518] font-bold">Days</span>
                                    </div>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${prediction.riskScore > 60 ? 'bg-red-500' : 'bg-green-500'}`}
                                        style={{ width: `${prediction.riskScore}%` }}
                                    ></div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>

            {/* Priority Tasks & Resources */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* High Priority Tasks */}
                <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                    <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                        <h3 className="font-industrial font-bold text-base">High Priority Tasks</h3>
                        <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-1 rounded uppercase">Urgent</span>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {MOCK_TASKS.filter(t => t.priority === 'High').slice(0, 4).map(task => (
                            <div key={task.id} className="p-4 hover:bg-slate-50 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-sm">{task.title}</h4>
                                    <span className="text-[10px] font-bold text-slate-400">{task.deadline}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500" style={{ width: `${task.progress}%` }}></div>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-700">{task.progress}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Resource Alerts */}
                <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                    <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                        <h3 className="font-industrial font-bold text-base">Resource Alerts</h3>
                        <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded uppercase">Action Required</span>
                    </div>
                    <div className="p-4 space-y-3">
                        {MOCK_MATERIALS.filter(m => m.quantity < m.reorderLevel).map(item => (
                            <div key={item.id} className="flex items-center gap-3 bg-amber-50 p-3 rounded border border-amber-100">
                                <div className="w-10 h-10 bg-white rounded flex items-center justify-center flex-shrink-0">
                                    <i className="fa-solid fa-box text-amber-600"></i>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <span className="text-sm font-bold">{item.itemName}</span>
                                        <span className="text-xs font-bold text-red-600">{item.quantity} {item.unit}</span>
                                    </div>
                                    <p className="text-[10px] text-slate-500 uppercase mt-1">Reorder: {item.reorderLevel} {item.unit}</p>
                                </div>
                                <button className="px-3 py-1.5 bg-[#F5C518] text-[#000] text-[10px] font-bold rounded uppercase">Order</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
                <h3 className="font-industrial font-bold text-lg mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <button className="p-4 bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 rounded-lg transition-colors">
                        <i className="fa-solid fa-plus-circle text-2xl text-blue-600 mb-2"></i>
                        <p className="text-sm font-bold text-blue-900">Create Task</p>
                    </button>
                    <button className="p-4 bg-green-50 hover:bg-green-100 border-2 border-green-200 rounded-lg transition-colors">
                        <i className="fa-solid fa-file-export text-2xl text-green-600 mb-2"></i>
                        <p className="text-sm font-bold text-green-900">Generate Report</p>
                    </button>
                    <button className="p-4 bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 rounded-lg transition-colors">
                        <i className="fa-solid fa-calendar-alt text-2xl text-purple-600 mb-2"></i>
                        <p className="text-sm font-bold text-purple-900">Schedule Meeting</p>
                    </button>
                    <button className="p-4 bg-amber-50 hover:bg-amber-100 border-2 border-amber-200 rounded-lg transition-colors">
                        <i className="fa-solid fa-truck text-2xl text-amber-600 mb-2"></i>
                        <p className="text-sm font-bold text-amber-900">Order Materials</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;
