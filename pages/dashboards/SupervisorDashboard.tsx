import React from 'react';
import { MOCK_TASKS, MOCK_WORKFORCE } from '../../constants';

interface DashboardConfig {
    type: string;
    title: string;
    description: string;
    primaryColor: string;
    widgets: string[];
}

interface SupervisorDashboardProps {
    config: DashboardConfig;
}

/**
 * Supervisor Dashboard
 * Team coordination and task assignment focus
 */
const SupervisorDashboard: React.FC<SupervisorDashboardProps> = ({ config }) => {
    const supervisorStats = [
        { label: 'Team Present', value: MOCK_WORKFORCE.filter(w => w.attendanceStatus === 'Present').length, icon: 'fa-user-check', color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Today\'s Tasks', value: MOCK_TASKS.filter(t => t.status === 'In Progress').length, icon: 'fa-tasks', color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Pending', value: MOCK_TASKS.filter(t => t.status === 'Pending').length, icon: 'fa-clock', color: 'text-amber-600', bg: 'bg-amber-50' },
        { label: 'Safety Checks', value: '12/15', icon: 'fa-helmet-safety', color: 'text-purple-600', bg: 'bg-purple-50' },
    ];

    const todaysTasks = MOCK_TASKS.filter(t => t.status === 'In Progress' || t.status === 'Pending').slice(0, 6);
    const teamMembers = MOCK_WORKFORCE.filter(w => w.attendanceStatus === 'Present');

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Supervisor Header */}
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg p-6 text-white shadow-xl">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-industrial font-bold mb-2">{config.title}</h2>
                        <p className="text-amber-50">{config.description}</p>
                    </div>
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                        <i className="fa-solid fa-hard-hat text-3xl"></i>
                    </div>
                </div>
            </div>

            {/* Supervisor Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {supervisorStats.map((stat, idx) => (
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

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Today's Tasks */}
                <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                    <div className="p-4 bg-slate-50 border-b border-slate-200">
                        <h3 className="font-industrial font-bold text-base">Today's Task List</h3>
                    </div>
                    <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
                        {todaysTasks.map(task => (
                            <div key={task.id} className="p-4 hover:bg-slate-50 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex-1">
                                        <h4 className="font-bold text-sm mb-1">{task.title}</h4>
                                        <p className="text-xs text-slate-500">Assigned: {task.assignedTo}</p>
                                    </div>
                                    <span className={`text-[10px] font-bold px-2 py-1 rounded ${task.priority === 'High' ? 'bg-red-100 text-red-700' :
                                            task.priority === 'Medium' ? 'bg-amber-100 text-amber-700' :
                                                'bg-blue-100 text-blue-700'
                                        }`}>
                                        {task.priority}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 mt-3">
                                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500" style={{ width: `${task.progress}%` }}></div>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-700">{task.progress}%</span>
                                </div>
                                <button className="mt-2 text-xs text-blue-600 hover:text-blue-700 font-bold">
                                    <i className="fa-solid fa-pencil mr-1"></i>Update
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team Status */}
                <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                    <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                        <h3 className="font-industrial font-bold text-base">Team Status</h3>
                        <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded uppercase">Active</span>
                    </div>
                    <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
                        {teamMembers.map(member => (
                            <div key={member.id} className="p-4 hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                        {member.name.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-sm">{member.name}</h4>
                                        <p className="text-xs text-slate-500">{member.role}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${member.attendanceStatus === 'Present' ? 'bg-green-500' :
                                                member.attendanceStatus === 'Late' ? 'bg-amber-500' :
                                                    'bg-red-500'
                                            }`}></span>
                                        <span className="text-xs font-bold text-slate-600">{member.attendanceStatus}</span>
                                    </div>
                                </div>
                                <div className="mt-3 flex items-center justify-between">
                                    <span className="text-[10px] text-slate-500 uppercase">Productivity</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-green-500" style={{ width: `${member.productivityScore}%` }}></div>
                                        </div>
                                        <span className="text-xs font-bold text-slate-700">{member.productivityScore}%</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
                <h3 className="font-industrial font-bold text-lg mb-4">Supervisor Actions</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <button className="p-4 bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 rounded-lg transition-colors">
                        <i className="fa-solid fa-user-plus text-2xl text-blue-600 mb-2"></i>
                        <p className="text-sm font-bold text-blue-900">Assign Task</p>
                    </button>
                    <button className="p-4 bg-green-50 hover:bg-green-100 border-2 border-green-200 rounded-lg transition-colors">
                        <i className="fa-solid fa-clipboard-check text-2xl text-green-600 mb-2"></i>
                        <p className="text-sm font-bold text-green-900">Mark Attendance</p>
                    </button>
                    <button className="p-4 bg-amber-50 hover:bg-amber-100 border-2 border-amber-200 rounded-lg transition-colors">
                        <i className="fa-solid fa-shield-halved text-2xl text-amber-600 mb-2"></i>
                        <p className="text-sm font-bold text-amber-900">Safety Check</p>
                    </button>
                    <button className="p-4 bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 rounded-lg transition-colors">
                        <i className="fa-solid fa-camera text-2xl text-purple-600 mb-2"></i>
                        <p className="text-sm font-bold text-purple-900">Upload Progress</p>
                    </button>
                </div>
            </div>

            {/* Safety Checklist */}
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
                <h3 className="font-industrial font-bold text-lg mb-4 flex items-center gap-2">
                    <i className="fa-solid fa-clipboard-list text-purple-600"></i>
                    Daily Safety Checklist
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                        'PPE compliance verified',
                        'Equipment inspection completed',
                        'Work area cleared',
                        'Emergency exits accessible',
                        'Fire extinguishers checked',
                        'First aid kit available'
                    ].map((item, idx) => (
                        <label key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded hover:bg-slate-100 cursor-pointer transition-colors">
                            <input type="checkbox" className="w-4 h-4 accent-green-600" defaultChecked={idx < 4} />
                            <span className="text-sm font-medium text-slate-700">{item}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SupervisorDashboard;
