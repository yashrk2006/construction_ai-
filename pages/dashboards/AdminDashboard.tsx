import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { MOCK_TASKS, MOCK_MATERIALS, MOCK_WORKFORCE, COLORS } from '../../constants';
import { predictProjectDelay } from '../../geminiService';
import { PredictionResult } from '../../types';

interface DashboardConfig {
    type: string;
    title: string;
    description: string;
    primaryColor: string;
    widgets: string[];
}

interface AdminDashboardProps {
    config: DashboardConfig;
}

/**
 * Executive/Admin Dashboard
 * Full system oversight with advanced analytics
 */
const AdminDashboard: React.FC<AdminDashboardProps> = ({ config }) => {
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

    const executiveStats = [
        { label: 'Project Health', value: '87%', icon: 'fa-chart-line', color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Budget Status', value: '₹2.4Cr', icon: 'fa-indian-rupee-sign', color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Team Efficiency', value: '94%', icon: 'fa-users-gear', color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Safety Score', value: '96%', icon: 'fa-shield-check', color: 'text-amber-600', bg: 'bg-amber-50' },
        { label: 'Active Tasks', value: MOCK_TASKS.filter(t => t.status === 'In Progress').length, icon: 'fa-tasks', color: 'text-blue-500', bg: 'bg-blue-50' },
        { label: 'Critical Items', value: MOCK_TASKS.filter(t => t.priority === 'High').length, icon: 'fa-exclamation-triangle', color: 'text-red-600', bg: 'bg-red-50' },
    ];

    const budgetData = [
        { name: 'Allocated', value: 2400 },
        { name: 'Spent', value: 1850 },
        { name: 'Pending', value: 550 }
    ];

    const chartData = [
        { month: 'Jan', budget: 40, actual: 38, forecast: 42 },
        { month: 'Feb', budget: 45, actual: 43, forecast: 46 },
        { month: 'Mar', budget: 50, actual: 52, forecast: 51 },
        { month: 'Apr', budget: 55, actual: 53, forecast: 57 },
        { month: 'May', budget: 60, actual: 58, forecast: 62 },
        { month: 'Jun', budget: 65, actual: 0, forecast: 67 },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Executive Header */}
            <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-lg p-6 text-white shadow-xl">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-industrial font-bold mb-2">{config.title}</h2>
                        <p className="text-slate-300">{config.description}</p>
                    </div>
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                        <i className="fa-solid fa-crown text-3xl text-yellow-400"></i>
                    </div>
                </div>
            </div>

            {/* Executive Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {executiveStats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-lg border-b-4 border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
                            <div className={`${stat.bg} ${stat.color} w-8 h-8 rounded flex items-center justify-center`}>
                                <i className={`fa-solid ${stat.icon} text-sm`}></i>
                            </div>
                        </div>
                        <h3 className="text-2xl font-industrial font-bold text-slate-800">{stat.value}</h3>
                    </div>
                ))}
            </div>

            {/* Main Analytics Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Budget Overview */}
                <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
                    <h3 className="font-industrial font-bold text-lg mb-4 flex items-center gap-2">
                        <i className="fa-solid fa-chart-pie text-blue-500"></i>
                        Budget Overview
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={budgetData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {budgetData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={['#3B82F6', '#10B981', '#F59E0B'][index]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Progress Forecast */}
                <div className="xl:col-span-2 bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
                    <h3 className="font-industrial font-bold text-lg mb-4 flex items-center gap-2">
                        <i className="fa-solid fa-chart-line text-green-500"></i>
                        Progress vs. Forecast
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <AreaChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                            <YAxis tick={{ fontSize: 11 }} />
                            <Tooltip />
                            <Area type="monotone" dataKey="budget" stroke="#94A3B8" fill="#E2E8F0" />
                            <Area type="monotone" dataKey="actual" stroke="#3B82F6" fill="#DBEAFE" />
                            <Area type="monotone" dataKey="forecast" stroke="#10B981" fill="#D1FAE5" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* AI Insights & Critical Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* AI Predictions */}
                <div className="bg-[#1A1A1A] rounded-lg overflow-hidden shadow-xl border-b-4 border-[#F5C518]">
                    <div className="p-4 bg-[#000] border-b border-white/5">
                        <span className="font-industrial text-[#F5C518] text-sm font-bold flex items-center gap-2">
                            <i className="fa-solid fa-brain"></i>
                            Executive AI Insights
                        </span>
                    </div>
                    <div className="p-6">
                        {loadingAI ? (
                            <div className="flex flex-col items-center justify-center py-12">
                                <div className="w-12 h-12 border-4 border-[#F5C518] border-t-transparent rounded-full animate-spin mb-4"></div>
                                <p className="text-slate-400 text-sm">Analyzing...</p>
                            </div>
                        ) : prediction ? (
                            <div className="space-y-4">
                                <div>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase mb-2">Predicted Delay</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl font-industrial font-bold text-white">+{prediction.delayDays}</span>
                                        <span className="text-xl font-industrial text-[#F5C518] font-bold">Days</span>
                                    </div>
                                </div>
                                <div className="p-4 bg-white/5 rounded border border-white/10">
                                    <p className="text-xs text-slate-300 italic">{prediction.reasoning}</p>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>

                {/* Critical Alerts */}
                <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                    <div className="p-4 bg-red-50 border-b border-red-100">
                        <h3 className="font-industrial font-bold text-lg text-red-900 flex items-center gap-2">
                            <i className="fa-solid fa-bell"></i>
                            Critical Alerts
                        </h3>
                    </div>
                    <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                        {MOCK_TASKS.filter(t => t.status === 'Delayed').map(task => (
                            <div key={task.id} className="p-4 hover:bg-slate-50 transition-colors">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-bold text-sm text-slate-800">{task.title}</h4>
                                        <p className="text-xs text-slate-500 mt-1">Deadline: {task.deadline}</p>
                                    </div>
                                    <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded">URGENT</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Action Center */}
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
                <h3 className="font-industrial font-bold text-lg mb-4">Executive Actions</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <button className="p-4 bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 rounded-lg transition-colors text-center">
                        <i className="fa-solid fa-download text-2xl text-blue-600 mb-2"></i>
                        <p className="text-sm font-bold text-blue-900">Download Report</p>
                    </button>
                    <button className="p-4 bg-green-50 hover:bg-green-100 border-2 border-green-200 rounded-lg transition-colors text-center">
                        <i className="fa-solid fa-users text-2xl text-green-600 mb-2"></i>
                        <p className="text-sm font-bold text-green-900">Manage Users</p>
                    </button>
                    <button className="p-4 bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 rounded-lg transition-colors text-center">
                        <i className="fa-solid fa-cog text-2xl text-purple-600 mb-2"></i>
                        <p className="text-sm font-bold text-purple-900">System Settings</p>
                    </button>
                    <button className="p-4 bg-amber-50 hover:bg-amber-100 border-2 border-amber-200 rounded-lg transition-colors text-center">
                        <i className="fa-solid fa-file-contract text-2xl text-amber-600 mb-2"></i>
                        <p className="text-sm font-bold text-amber-900">Audit Logs</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
