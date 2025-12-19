import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'admin' | 'manager' | 'engineer' | 'supervisor' | 'siteworker';

export interface User {
    id: string;
    name: string;
    role: UserRole;
    email: string;
    avatar?: string;
    permissions: string[];
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    isRole: (role: UserRole | UserRole[]) => boolean;
    hasPermission: (permission: string) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Default to Admin for demo
    const [user, setUser] = useState<User | null>({
        id: 'user_001',
        name: 'Rajesh Kumar',
        role: 'admin',
        email: 'rajesh.kumar@buildsmart.in',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
        permissions: ['view_budget', 'view_reports', 'manage_users', 'view_all_tasks', 'approve_tasks']
    });

    const isRole = (role: UserRole | UserRole[]): boolean => {
        if (!user) return false;
        if (Array.isArray(role)) {
            return role.includes(user.role);
        }
        return user.role === role;
    };

    const hasPermission = (permission: string): boolean => {
        if (!user) return false;
        return user.permissions.includes(permission);
    };

    return (
        <UserContext.Provider value={{ user, setUser, isRole, hasPermission }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within UserProvider');
    }
    return context;
};

// Role Configuration
export const ROLE_CONFIG = {
    admin: {
        title: 'Admin Dashboard',
        description: 'Complete project oversight & control',
        primaryAction: 'Download Executive Report',
        features: ['budget', 'analytics', 'users', 'reports', 'all_projects', 'quality_control'],
        navigationItems: ['dashboard', 'installation', 'tasks', 'materials', 'workforce', 'safety', 'reports']
    },
    manager: {
        title: 'Project Management',
        description: 'Planning, scheduling & reporting',
        primaryAction: 'Generate Project Report',
        features: ['planning', 'scheduling', 'reports', 'budget_view', 'assigned_projects'],
        navigationItems: ['dashboard', 'installation', 'tasks', 'materials', 'workforce', 'safety', 'reports']
    },
    engineer: {
        title: 'Site Engineering',
        description: 'Technical oversight & quality control',
        primaryAction: 'Review Technical Specs',
        features: ['technical_review', 'quality_control', 'approvals', 'blueprints'],
        navigationItems: ['dashboard', 'installation', 'tasks', 'materials', 'safety', 'reports']
    },
    supervisor: {
        title: 'Site Supervision',
        description: 'Team management & task coordination',
        primaryAction: 'Assign Daily Tasks',
        features: ['task_assignment', 'team_management', 'progress_tracking', 'safety_checks'],
        navigationItems: ['dashboard', 'tasks', 'workforce', 'safety']
    },
    siteworker: {
        title: 'Field Work',
        description: 'Task execution & reporting',
        primaryAction: 'Upload Progress Photo',
        features: ['my_tasks', 'safety_checkin', 'photo_upload', 'material_request'],
        navigationItems: ['dashboard', 'tasks', 'safety']
    }
} as const;

// Permission Helpers
export const PERMISSIONS = {
    VIEW_BUDGET: 'view_budget',
    MANAGE_USERS: 'manage_users',
    APPROVE_TASKS: 'approve_tasks',
    VIEW_ALL_TASKS: 'view_all_tasks',
    VIEW_REPORTS: 'view_reports',
    UPLOAD_PHOTOS: 'upload_photos',
    VIEW_SAFETY: 'view_safety',
    TECHNICAL_REVIEW: 'technical_review',
    ASSIGN_TASKS: 'assign_tasks'
} as const;

// Default permissions by role
export const DEFAULT_PERMISSIONS: Record<UserRole, string[]> = {
    admin: [
        PERMISSIONS.VIEW_BUDGET,
        PERMISSIONS.MANAGE_USERS,
        PERMISSIONS.APPROVE_TASKS,
        PERMISSIONS.VIEW_ALL_TASKS,
        PERMISSIONS.VIEW_REPORTS,
        PERMISSIONS.VIEW_SAFETY,
        PERMISSIONS.TECHNICAL_REVIEW,
        PERMISSIONS.ASSIGN_TASKS
    ],
    manager: [
        PERMISSIONS.VIEW_BUDGET,
        PERMISSIONS.APPROVE_TASKS,
        PERMISSIONS.VIEW_ALL_TASKS,
        PERMISSIONS.VIEW_REPORTS,
        PERMISSIONS.VIEW_SAFETY,
        PERMISSIONS.ASSIGN_TASKS
    ],
    engineer: [
        PERMISSIONS.TECHNICAL_REVIEW,
        PERMISSIONS.APPROVE_TASKS,
        PERMISSIONS.VIEW_ALL_TASKS,
        PERMISSIONS.VIEW_REPORTS,
        PERMISSIONS.VIEW_SAFETY
    ],
    supervisor: [
        PERMISSIONS.ASSIGN_TASKS,
        PERMISSIONS.VIEW_ALL_TASKS,
        PERMISSIONS.VIEW_SAFETY,
        PERMISSIONS.UPLOAD_PHOTOS
    ],
    siteworker: [
        PERMISSIONS.VIEW_SAFETY,
        PERMISSIONS.UPLOAD_PHOTOS
    ]
};
