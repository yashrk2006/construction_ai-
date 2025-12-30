import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../services/rbac';

/**
 * Enhanced Login Page with Backend Integration
 * Supports both demo and production authentication
 */
const LoginEnhanced: React.FC = () => {
    const { demoLogin, login, loading, error } = useAuth();
    const [mode, setMode] = useState<'demo' | 'credentials'>('demo');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState<UserRole>('Project Manager');

    const demoUsers = [
        {
            role: 'Admin' as UserRole,
            name: 'Rajesh Kumar',
            email: 'rajesh@buildsmart.in',
            icon: 'fa-user-shield',
            color: 'from-red-500 to-red-600',
            accessLevel: 4
        },
        {
            role: 'Project Manager' as UserRole,
            name: 'Priya Sharma',
            email: 'priya@buildsmart.in',
            icon: 'fa-user-tie',
            color: 'from-blue-500 to-blue-600',
            accessLevel: 3
        },
        {
            role: 'Supervisor' as UserRole,
            name: 'Amit Patel',
            email: 'amit@buildsmart.in',
            icon: 'fa-user-gear',
            color: 'from-amber-500 to-amber-600',
            accessLevel: 2
        },
        {
            role: 'Worker' as UserRole,
            name: 'Ramesh Singh',
            email: 'ramesh@buildsmart.in',
            icon: 'fa-user-hard-hat',
            color: 'from-green-500 to-green-600',
            accessLevel: 1
        }
    ];

    const handleDemoLogin = async (role: UserRole) => {
        try {
            await demoLogin(role);
        } catch (err) {
            console.error('Demo login failed:', err);
        }
    };

    const handleCredentialLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
            <div className="max-w-6xl w-full">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#FF9933] via-white to-[#138808] rounded-lg flex items-center justify-center shadow-lg">
                            <i className="fa-solid fa-hard-hat text-2xl text-slate-900"></i>
                        </div>
                        <h1 className="text-5xl font-industrial font-black text-white tracking-tight">
                            BuildSmart AI
                        </h1>
                    </div>
                    <p className="text-lg text-slate-400 font-semibold">
                        Production-Grade Construction Management System
                    </p>
                    <div className="mt-4 inline-flex gap-3">
                        <div className="px-6 py-2 bg-[#F5C518] text-black rounded-full text-sm font-bold">
                            🎯 Role-Based Access Control
                        </div>
                        <div className="px-6 py-2 bg-green-600 text-white rounded-full text-sm font-bold">
                            ✅ Production Ready
                        </div>
                    </div>
                </div>

                {/* Login Mode Toggle */}
                <div className="flex justify-center mb-8">
                    <div className="bg-slate-800 p-1 rounded-lg flex gap-2">
                        <button
                            onClick={() => setMode('demo')}
                            className={`px-6 py-2 rounded font-bold text-sm transition-all ${mode === 'demo'
                                    ? 'bg-[#F5C518] text-black'
                                    : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            Demo Login
                        </button>
                        <button
                            onClick={() => setMode('credentials')}
                            className={`px-6 py-2 rounded font-bold text-sm transition-all ${mode === 'credentials'
                                    ? 'bg-[#F5C518] text-black'
                                    : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            Email & Password
                        </button>
                    </div>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="mb-6 bg-red-500/10 border border-red-500 rounded-lg p-4 text-center">
                        <p className="text-red-400 font-medium">{error}</p>
                    </div>
                )}

                {mode === 'demo' ? (
                    // Demo Role Selection
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {demoUsers.map((user) => (
                            <div
                                key={user.role}
                                onClick={() => !loading && handleDemoLogin(user.role)}
                                onMouseEnter={() => setSelectedRole(user.role)}
                                className={`
                                    bg-slate-800 border-2 rounded-xl p-6 cursor-pointer
                                    transition-all duration-300 hover:scale-105
                                    ${selectedRole === user.role
                                        ? 'border-[#F5C518] shadow-[0_0_30px_rgba(245,197,24,0.3)]'
                                        : 'border-slate-700 hover:border-slate-600'
                                    }
                                    ${loading ? 'opacity-50 cursor-not-allowed' : ''}
                                `}
                            >
                                <div className="text-center">
                                    <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${user.color} flex items-center justify-center shadow-lg`}>
                                        <i className={`fa-solid ${user.icon} text-3xl text-white`}></i>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-2">{user.role}</h3>
                                    <p className="text-sm text-slate-400 mb-1">{user.name}</p>
                                    <p className="text-xs text-slate-500">{user.email}</p>

                                    <div className="mt-4 pt-4 border-t border-slate-700">
                                        <div className="text-xs text-slate-400 mb-2">Access Level:</div>
                                        <div className="flex justify-center gap-1">
                                            {Array.from({ length: user.accessLevel }).map((_, i) => (
                                                <div key={i} className="w-2 h-2 rounded-full bg-[#F5C518]"></div>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        disabled={loading}
                                        className="mt-4 w-full bg-[#F5C518] text-black py-2 rounded font-bold text-sm hover:bg-yellow-400 transition-colors disabled:opacity-50"
                                    >
                                        {loading ? (
                                            <>
                                                <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                                                Logging in...
                                            </>
                                        ) : (
                                            <>Login as {user.role}</>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Credential Login Form
                    <div className="max-w-md mx-auto">
                        <div className="bg-slate-800 border-2 border-slate-700 rounded-xl p-8">
                            <form onSubmit={handleCredentialLogin} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-300 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#F5C518] transition-colors"
                                        placeholder="you@buildsmart.in"
                                        required
                                        disabled={loading}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-300 mb-2">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#F5C518] transition-colors"
                                        placeholder="••••••••"
                                        required
                                        disabled={loading}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#F5C518] text-black py-3 rounded-lg font-bold text-base hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                                            Logging in...
                                        </>
                                    ) : (
                                        'Login'
                                    )}
                                </button>
                            </form>

                            <div className="mt-6 pt-6 border-t border-slate-700 text-center">
                                <p className="text-sm text-slate-400">
                                    Demo credentials: Use any demo user email with password "demo123"
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Features Info */}
                <div className="mt-12 bg-slate-800 border border-slate-700 rounded-xl p-8">
                    <h3 className="text-xl font-bold text-white mb-6 text-center">
                        🎨 Role-Based Features
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                                <i className="fa-solid fa-shield-halved text-red-400"></i>
                            </div>
                            <div>
                                <div className="font-bold text-white">Admin</div>
                                <div className="text-slate-400">Full system control with executive analytics</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                <i className="fa-solid fa-briefcase text-blue-400"></i>
                            </div>
                            <div>
                                <div className="font-bold text-white">Project Manager</div>
                                <div className="text-slate-400">Resource planning & team management</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                                <i className="fa-solid fa-hard-hat text-amber-400"></i>
                            </div>
                            <div>
                                <div className="font-bold text-white">Supervisor</div>
                                <div className="text-slate-400">Task coordination & safety checks</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                <i className="fa-solid fa-user text-green-400"></i>
                            </div>
                            <div>
                                <div className="font-bold text-white">Worker</div>
                                <div className="text-slate-400">Task execution & progress tracking</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-slate-500 text-sm space-y-2">
                    <p>🔒 Secure JWT Authentication • 🎯 Granular Permission System • 🚀 Production Ready</p>
                    <p className="text-xs">Built with React + TypeScript + Express.js + MongoDB + AI Integration</p>
                </div>
            </div>
        </div>
    );
};

export default LoginEnhanced;
