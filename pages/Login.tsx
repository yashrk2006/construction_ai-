import React, { useState } from 'react';
import { User, Role } from '../types';

interface LoginProps {
    onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [selectedRole, setSelectedRole] = useState<Role>('Project Manager');

    // Demo users with different roles
    const demoUsers: User[] = [
        {
            id: '1',
            name: 'Rajesh Kumar',
            email: 'rajesh@buildsmart.in',
            role: 'Admin',
            site: 'Mumbai Metro Line 3 - Phase II'
        },
        {
            id: '2',
            name: 'Priya Sharma',
            email: 'priya@buildsmart.in',
            role: 'Project Manager',
            site: 'Mumbai Metro Line 3 - Phase II'
        },
        {
            id: '3',
            name: 'Amit Patel',
            email: 'amit@buildsmart.in',
            role: 'Supervisor',
            site: 'Mumbai Metro Line 3 - Phase II'
        },
        {
            id: '4',
            name: 'Ramesh Singh',
            email: 'ramesh@buildsmart.in',
            role: 'Worker',
            site: 'Mumbai Metro Line 3 - Phase II'
        }
    ];

    const handleLogin = (role: Role) => {
        const user = demoUsers.find(u => u.role === role) || demoUsers[1];
        onLogin(user);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
            <div className="max-w-5xl w-full">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-industrial font-black text-white mb-4 tracking-tight">
                        BuildSmart AI
                    </h1>
                    <p className="text-lg text-slate-400 font-semibold">
                        Role-Based Construction Management System
                    </p>
                    <div className="mt-4 inline-block px-6 py-2 bg-[#F5C518] text-black rounded-full text-sm font-bold">
                        🎯 DEMO FOR JUDGES - Select Your Role
                    </div>
                </div>

                {/* Role Selection Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {demoUsers.map((user) => (
                        <div
                            key={user.id}
                            onClick={() => handleLogin(user.role)}
                            className={`
                bg-slate-800 border-2 rounded-xl p-6 cursor-pointer
                transition-all duration-300 hover:scale-105
                ${selectedRole === user.role ? 'border-[#F5C518] shadow-[0_0_30px_rgba(245,197,24,0.3)]' : 'border-slate-700 hover:border-slate-600'}
              `}
                        >
                            <div className="text-center">
                                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#F5C518] to-yellow-600 flex items-center justify-center">
                                    <i className={`fa-solid ${user.role === 'Admin' ? 'fa-user-shield' :
                                            user.role === 'Project Manager' ? 'fa-user-tie' :
                                                user.role === 'Supervisor' ? 'fa-user-gear' :
                                                    'fa-user-hard-hat'
                                        } text-3xl text-slate-900`}></i>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2">{user.role}</h3>
                                <p className="text-sm text-slate-400 mb-1">{user.name}</p>
                                <p className="text-xs text-slate-500">{user.email}</p>

                                <div className="mt-4 pt-4 border-t border-slate-700">
                                    <div className="text-xs text-slate-400 mb-2">Access Level:</div>
                                    <div className="flex justify-center gap-1">
                                        {Array.from({ length: user.role === 'Admin' ? 4 : user.role === 'Project Manager' ? 3 : user.role === 'Supervisor' ? 2 : 1 }).map((_, i) => (
                                            <div key={i} className="w-2 h-2 rounded-full bg-[#F5C518]"></div>
                                        ))}
                                    </div>
                                </div>

                                <button className="mt-4 w-full bg-[#F5C518] text-black py-2 rounded font-bold text-sm hover:bg-yellow-400 transition-colors">
                                    Login as {user.role}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Features Info */}
                <div className="mt-12 bg-slate-800 border border-slate-700 rounded-xl p-8">
                    <h3 className="text-xl font-bold text-white mb-4 text-center">
                        🎨 Role-Based Dashboard Features
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                <i className="fa-solid fa-shield-halved text-blue-400"></i>
                            </div>
                            <div>
                                <div className="font-bold text-white">Admin</div>
                                <div className="text-slate-400">Full access to all features, user management, system settings</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                <i className="fa-solid fa-briefcase text-green-400"></i>
                            </div>
                            <div>
                                <div className="font-bold text-white">Project Manager</div>
                                <div className="text-slate-400">Tasks, workforce, materials, reports, AI predictions</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                                <i className="fa-solid fa-hard-hat text-yellow-400"></i>
                            </div>
                            <div>
                                <div className="font-bold text-white">Supervisor</div>
                                <div className="text-slate-400">Task updates, safety checks, workforce attendance</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                                <i className="fa-solid fa-user text-orange-400"></i>
                            </div>
                            <div>
                                <div className="font-bold text-white">Worker</div>
                                <div className="text-slate-400">View assigned tasks, mark attendance, safety alerts</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-slate-500 text-sm">
                    <p>Built with React + TypeScript + Express.js + AI Integration</p>
                    <p className="mt-2">🇮🇳 Made in India for Indian Construction Industry</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
