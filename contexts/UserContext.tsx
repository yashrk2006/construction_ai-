import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'boss' | 'manager' | 'worker' | 'labour';

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
    // Default to Boss for demo - In production, this would come from login API
    const [user, setUser] = useState<User | null>({
        id: 'user_001',
        name: 'Rajesh Kumar',
        role: 'boss',
        email: 'rajesh.kumar@buildsmart.in',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
        permissions: ['view_budget', 'view_reports', 'manage_users', 'view_all_tasks']
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
    boss: {
        title: 'Executive Dashboard',
        description: 'High-level overview & financial insights',
        primaryAction: 'Download Executive Report',
        features: ['budget', 'analytics', 'users', 'reports', 'all_projects'],
        navigationItems: ['dashboard', 'installation', 'tasks', 'materials', 'workforce', 'safety', 'reports']
    },
    manager: {
        title: 'Project Management',
        description: 'Task coordination & approvals',
        primaryAction: 'Approve Site Work',
        features: ['tasks', 'approvals', 'compliance', 'reports', 'assigned_projects'],
        navigationItems: ['dashboard', 'tasks', 'materials', 'workforce', 'safety', 'reports']
    },
    worker: {
        title: 'My Tasks',
        description: 'Daily assignments & progress',
        primaryAction: 'Start Task / Clock In',
        features: ['my_tasks', 'safety_checkin', 'upload_photo'],
        navigationItems: ['dashboard', 'tasks', 'safety']
    },
    labour: {
        title: 'Field Work',
        description: 'Safety & photo uploads',
        primaryAction: 'Upload Progress Photo',
        features: ['safety_alerts', 'photo_upload', 'daily_tasks'],
        navigationItems: ['dashboard', 'safety']
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
    VIEW_SAFETY: 'view_safety'
} as const;

// Default permissions by role
export const DEFAULT_PERMISSIONS: Record<UserRole, string[]> = {
    boss: [
        PERMISSIONS.VIEW_BUDGET,
        PERMISSIONS.MANAGE_USERS,
        PERMISSIONS.APPROVE_TASKS,
        PERMISSIONS.VIEW_ALL_TASKS,
        PERMISSIONS.VIEW_REPORTS,
        PERMISSIONS.VIEW_SAFETY
    ],
    manager: [
        PERMISSIONS.APPROVE_TASKS,
        PERMISSIONS.VIEW_ALL_TASKS,
        PERMISSIONS.VIEW_REPORTS,
        PERMISSIONS.VIEW_SAFETY,
        PERMISSIONS.UPLOAD_PHOTOS
    ],
    worker: [
        PERMISSIONS.VIEW_SAFETY,
        PERMISSIONS.UPLOAD_PHOTOS
    ],
    labour: [
        PERMISSIONS.VIEW_SAFETY,
        PERMISSIONS.UPLOAD_PHOTOS
    ]
};
