import React, { useState } from 'react';
import { useUser, UserRole, DEFAULT_PERMISSIONS } from '../contexts/UserContext';

const RoleSwitcher: React.FC = () => {
    const { user, setUser } = useUser();
    const [isOpen, setIsOpen] = useState(false);

    const roles: { role: UserRole; label: string; icon: string; color: string }[] = [
        { role: 'admin', label: 'Admin/Owner', icon: 'fa-user-tie', color: 'bg-purple-600' },
        { role: 'manager', label: 'Project Manager', icon: 'fa-user-check', color: 'bg-blue-600' },
        { role: 'engineer', label: 'Site Engineer', icon: 'fa-user-gear', color: 'bg-cyan-600' },
        { role: 'supervisor', label: 'Site Supervisor', icon: 'fa-user-shield', color: 'bg-green-600' },
        { role: 'siteworker', label: 'Site Worker', icon: 'fa-user-hard-hat', color: 'bg-orange-600' }
    ];

    const switchRole = (newRole: UserRole) => {
        if (user) {
            setUser({
                ...user,
                role: newRole,
                permissions: DEFAULT_PERMISSIONS[newRole]
            });
            setIsOpen(false);
        }
    };

    if (!user) return null;

    const currentRoleData = roles.find(r => r.role === user.role);

    return (
        <div className="relative">
            {/* Role Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-all shadow-sm"
                title="Switch User Role"
            >
                <div className={`w-6 h-6 rounded ${currentRoleData?.color} flex items-center justify-center text-white`}>
                    <i className={`fa-solid ${currentRoleData?.icon} text-xs`}></i>
                </div>
                <div className="hidden md:flex flex-col items-start">
                    <span className="text-[10px] font-bold text-slate-400 uppercase leading-none">Role</span>
                    <span className="text-xs font-bold text-slate-700 leading-tight">{currentRoleData?.label}</span>
                </div>
                <i className={`fa-solid fa-chevron-${isOpen ? 'up' : 'down'} text-xs text-slate-400`}></i>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown */}
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-4 duration-200">
                        {/* Header */}
                        <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
                            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Switch User Role</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">Construction Hierarchy</p>
                        </div>

                        {/* Role Options */}
                        <div className="p-2">
                            {roles.map(({ role, label, icon, color }) => (
                                <button
                                    key={role}
                                    onClick={() => switchRole(role)}
                                    disabled={user.role === role}
                                    className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left
                    transition-all font-industrial text-sm mb-1
                    ${user.role === role
                                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                            : 'hover:bg-slate-50 text-slate-700 hover:shadow-sm cursor-pointer active:scale-98'
                                        }`}
                                >
                                    <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center text-white shrink-0 shadow-sm`}>
                                        <i className={`fa-solid ${icon} text-sm`}></i>
                                    </div>
                                    <span className="flex-1 font-medium">{label}</span>
                                    {user.role === role && (
                                        <i className="fa-solid fa-check text-green-500"></i>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Footer Info */}
                        <div className="px-4 py-2 bg-blue-50 border-t border-blue-100">
                            <p className="text-[10px] text-blue-600 font-medium">
                                <i className="fa-solid fa-info-circle mr-1"></i>
                                Navigation changes based on role
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default RoleSwitcher;
