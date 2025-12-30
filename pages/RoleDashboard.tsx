import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getDashboardConfig, ROLE_DEFINITIONS } from '../services/rbac';
import AdminDashboard from './dashboards/AdminDashboard';
import ManagerDashboard from './dashboards/ManagerDashboard';
import SupervisorDashboard from './dashboards/SupervisorDashboard';
import WorkerDashboard from './dashboards/WorkerDashboard';

/**
 * Role-Based Dashboard Router
 * Automatically renders appropriate dashboard based on user role
 */
const RoleDashboard: React.FC = () => {
    const { user } = useAuth();

    if (!user) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <i className="fa-solid fa-user-slash text-4xl text-slate-400 mb-4"></i>
                    <p className="text-slate-600">Not authenticated</p>
                </div>
            </div>
        );
    }

    const dashboardConfig = getDashboardConfig(user.role);

    // Route to appropriate dashboard based on role
    switch (user.role) {
        case 'Admin':
            return <AdminDashboard config={dashboardConfig} />;

        case 'Project Manager':
            return <ManagerDashboard config={dashboardConfig} />;

        case 'Supervisor':
            return <SupervisorDashboard config={dashboardConfig} />;

        case 'Worker':
            return <WorkerDashboard config={dashboardConfig} />;

        default:
            return (
                <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                        <i className="fa-solid fa-exclamation-triangle text-4xl text-amber-500 mb-4"></i>
                        <p className="text-slate-600">Unknown role: {user.role}</p>
                    </div>
                </div>
            );
    }
};

export default RoleDashboard;
