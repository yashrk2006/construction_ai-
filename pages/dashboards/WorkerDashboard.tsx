import React, { useState } from 'react';
import { MOCK_TASKS } from '../../constants';

interface DashboardConfig {
    type: string;
    title: string;
    description: string;
    primaryColor: string;
    widgets: string[];
}

interface WorkerDashboardProps {
    config: DashboardConfig;
}

/**
 * Worker Dashboard
 * Focused on personal tasks and daily operations
 */
const WorkerDashboard: React.FC<WorkerDashboardProps> = ({ config }) => {
    const [checkedIn, setCheckedIn] = useState(false);
    const currentTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    const currentDate = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    // Filter tasks relevant to worker
    const myTasks = MOCK_TASKS.filter(t => t.status === 'In Progress' || t.status === 'Pending').slice(0, 4);

    const workerStats = [
        { label: 'My Tasks', value: myTasks.length, icon: 'fa-clipboard-list', color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Completed Today', value: '3', icon: 'fa-check-circle', color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Hours Logged', value: '6.5', icon: 'fa-clock', color: 'text-purple-600', bg: 'bg-purple-50' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Worker Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-white shadow-xl">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-industrial font-bold mb-2">{config.title}</h2>
                        <p className="text-green-50">{config.description}</p>
                    </div>
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                        <i className="fa-solid fa-user-hard-hat text-3xl"></i>
                    </div>
                </div>
            </div>

            {/* Check In/Out Card */}
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-md">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="font-industrial text-xl font-bold text-slate-800">{currentTime}</h3>
                        <p className="text-sm text-slate-500">{currentDate}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${checkedIn ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'
                        }`}>
                        <i className={`fa-solid ${checkedIn ? 'fa-user-check' : 'fa-user-clock'} text-2xl`}></i>
                    </div>
                </div>
                <button
                    onClick={() => setCheckedIn(!checkedIn)}
                    className={`w-full py-3 rounded-lg font-bold text-white transition-all ${checkedIn
                            ? 'bg-red-500 hover:bg-red-600'
                            : 'bg-green-500 hover:bg-green-600'
                        }`}
                >
                    {checkedIn ? (
                        <>
                            <i className="fa-solid fa-right-from-bracket mr-2"></i>
                            Check Out
                        </>
                    ) : (
                        <>
                            <i className="fa-solid fa-right-to-bracket mr-2"></i>
                            Check In
                        </>
                    )}
                </button>
            </div>

            {/* Worker Stats */}
            <div className="grid grid-cols-3 gap-4">
                {workerStats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-lg border-b-4 border-slate-200 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
                            <div className={`${stat.bg} ${stat.color} w-7 h-7 rounded flex items-center justify-center`}>
                                <i className={`fa-solid ${stat.icon} text-xs`}></i>
                            </div>
                        </div>
                        <h3 className="text-2xl font-industrial font-bold text-slate-800">{stat.value}</h3>
                    </div>
                ))}
            </div>

            {/* My Tasks */}
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                    <h3 className="font-industrial font-bold text-lg">My Assigned Tasks</h3>
                    <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded uppercase">
                        {myTasks.length} Active
                    </span>
                </div>
                <div className="divide-y divide-slate-100">
                    {myTasks.map(task => (
                        <div key={task.id} className="p-4 hover:bg-slate-50 transition-colors">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h4 className="font-bold text-base mb-1">{task.title}</h4>
                                    <p className="text-sm text-slate-600">{task.description}</p>
                                    <p className="text-xs text-slate-400 mt-1">Due: {task.deadline}</p>
                                </div>
                                <span className={`text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap ${task.priority === 'High' ? 'bg-red-100 text-red-700' :
                                        task.priority === 'Medium' ? 'bg-amber-100 text-amber-700' :
                                            'bg-blue-100 text-blue-700'
                                    }`}>
                                    {task.priority}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${task.progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                                        style={{ width: `${task.progress}%` }}
                                    ></div>
                                </div>
                                <span className="text-xs font-bold text-slate-700">{task.progress}%</span>
                            </div>
                            <div className="flex gap-2">
                                <button className="flex-1 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded font-bold text-sm transition-colors">
                                    <i className="fa-solid fa-arrow-up mr-1"></i>
                                    Update Progress
                                </button>
                                <button className="px-3 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded font-bold text-sm transition-colors">
                                    <i className="fa-solid fa-check mr-1"></i>
                                    Complete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
                <h3 className="font-industrial font-bold text-lg mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <button className="p-4 bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 rounded-lg transition-colors">
                        <i className="fa-solid fa-camera text-2xl text-blue-600 mb-2"></i>
                        <p className="text-sm font-bold text-blue-900">Upload Photo</p>
                    </button>
                    <button className="p-4 bg-amber-50 hover:bg-amber-100 border-2 border-amber-200 rounded-lg transition-colors">
                        <i className="fa-solid fa-exclamation-triangle text-2xl text-amber-600 mb-2"></i>
                        <p className="text-sm font-bold text-amber-900">Report Issue</p>
                    </button>
                    <button className="p-4 bg-green-50 hover:bg-green-100 border-2 border-green-200 rounded-lg transition-colors">
                        <i className="fa-solid fa-box text-2xl text-green-600 mb-2"></i>
                        <p className="text-sm font-bold text-green-900">Request Material</p>
                    </button>
                    <button className="p-4 bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 rounded-lg transition-colors">
                        <i className="fa-solid fa-shield-halved text-2xl text-purple-600 mb-2"></i>
                        <p className="text-sm font-bold text-purple-900">Safety Alert</p>
                    </button>
                </div>
            </div>

            {/* Safety Reminder */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
                <div className="flex items-start gap-3">
                    <i className="fa-solid fa-helmet-safety text-2xl text-amber-600 mt-1"></i>
                    <div>
                        <h4 className="font-bold text-amber-900 mb-1">Safety First!</h4>
                        <p className="text-sm text-amber-800">
                            Always wear your PPE. Report any unsafe conditions immediately. Your safety is our priority.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkerDashboard;
