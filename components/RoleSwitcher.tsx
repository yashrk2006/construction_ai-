import React from 'react';
import { useUser, UserRole, DEFAULT_PERMISSIONS } from '../contexts/UserContext';

const RoleSwitcher: React.FC = () => {
    const { user, setUser } = useUser();

    const roles: { role: UserRole; label: string; icon: string; color: string }[] = [
        { role: 'boss', label: 'Boss/Admin', icon: 'fa-user-tie', color: 'bg-purple-500' },
        { role: 'manager', label: 'Manager', icon: 'fa-user-check', color: 'bg-blue-500' },
        { role: 'worker', label: 'Worker', icon: 'fa-user-hard-hat', color: 'bg-green-500' },
        { role: 'labour', label: 'Labour', icon: 'fa-user-helmet-safety', color: 'bg-orange-500' }
    ];

    const switchRole = (newRole: UserRole) => {
        if (user) {
            setUser({
                ...user,
                role: newRole,
                permissions: DEFAULT_PERMISSIONS[newRole]
            });
        }
    };

    if (!user) return null;

    const currentRoleData = roles.find(r => r.role === user.role);

    return (
        <div className="fixed bottom-4 right-4 z-[9999]">
            <div className="bg-white rounded-lg shadow-2xl border-2 border-slate-200 overflow-hidden">
                {/* Current Role Display */}
                <div className={`${currentRoleData?.color} text-white px-4 py-2 flex items-center gap-2`}>
                    <i className={`fa-solid ${currentRoleData?.icon} text-sm`}></i>
                    <span className="font-bold text-xs uppercase tracking-wider">
                        {currentRoleData?.label}
                    </span>
                </div>

                {/* Role Switcher */}
                <div className="p-3 space-y-2">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                        Switch Role (Demo)
                    </div>
                    {roles.map(({ role, label, icon, color }) => (
                        <button
                            key={role}
                            onClick={() => switchRole(role)}
                            disabled={user.role === role}
                            className={`
                w-full flex items-center gap-3 px-3 py-2 rounded text-left
                transition-all font-industrial text-xs
                ${user.role === role
                                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                    : 'hover:bg-slate-50 text-slate-700 hover:shadow-md cursor-pointer'
                                }`}
                        >
                            <div className={`w-6 h-6 rounded ${color} flex items-center justify-center text-white shrink-0`}>
                                <i className={`fa-solid ${icon} text-[10px]`}></i>
                            </div>
                            <span className="flex-1">{label}</span>
                            {user.role === role && (
                                <i className="fa-solid fa-check text-green-500 text-xs"></i>
                            )}
                        </button>
                    ))}
                </div>

                {/* Info */}
                <div className="px-3 py-2 bg-slate-50 border-t border-slate-200">
                    <p className="text-[9px] text-slate-500 italic">
                        Switch roles to see different dashboards
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RoleSwitcher;
