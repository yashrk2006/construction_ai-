import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserRole, ROLE_DEFINITIONS, hasPermission } from '../services/rbac';

interface AuthUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    site: string;
    avatar?: string;
    permissions: string[];
    token?: string;
}

interface AuthContextType {
    user: AuthUser | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    demoLogin: (role: UserRole) => Promise<void>;
    logout: () => void;
    updateUser: (updates: Partial<AuthUser>) => void;
    hasPermission: (permission: string) => boolean;
    isRole: (role: UserRole | UserRole[]) => boolean;
    loading: boolean;
    error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const DEMO_MODE = import.meta.env.VITE_ENABLE_DEMO_MODE === 'true' || import.meta.env.VITE_ENABLE_DEMO_MODE === true;

// Demo users for frontend-only mode
const DEMO_USERS: Record<UserRole, AuthUser> = {
    'Admin': {
        id: 'demo-admin-1',
        name: 'Rajesh Kumar',
        email: 'rajesh@buildsmart.in',
        role: 'Admin',
        site: 'Mumbai Metro Line 3 - Phase II',
        avatar: '👨‍💼',
        permissions: ROLE_DEFINITIONS['Admin'].permissions,
        token: 'demo-token-admin'
    },
    'Project Manager': {
        id: 'demo-manager-1',
        name: 'Priya Sharma',
        email: 'priya@buildsmart.in',
        role: 'Project Manager',
        site: 'Mumbai Metro Line 3 - Phase II',
        avatar: '👩‍💼',
        permissions: ROLE_DEFINITIONS['Project Manager'].permissions,
        token: 'demo-token-manager'
    },
    'Supervisor': {
        id: 'demo-supervisor-1',
        name: 'Amit Patel',
        email: 'amit@buildsmart.in',
        role: 'Supervisor',
        site: 'Mumbai Metro Line 3 - Phase II',
        avatar: '👷‍♂️',
        permissions: ROLE_DEFINITIONS['Supervisor'].permissions,
        token: 'demo-token-supervisor'
    },
    'Worker': {
        id: 'demo-worker-1',
        name: 'Ramesh Singh',
        email: 'ramesh@buildsmart.in',
        role: 'Worker',
        site: 'Mumbai Metro Line 3 - Phase II',
        avatar: '👨‍🔧',
        permissions: ROLE_DEFINITIONS['Worker'].permissions,
        token: 'demo-token-worker'
    }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Initialize - try to restore session from localStorage
    useEffect(() => {
        const initAuth = async () => {
            try {
                const savedToken = localStorage.getItem('auth_token');
                const savedUser = localStorage.getItem('auth_user');

                if (savedToken && savedUser) {
                    const userData = JSON.parse(savedUser);
                    setUser({ ...userData, token: savedToken });
                }
            } catch (err) {
                console.error('Failed to restore session:', err);
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_user');
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    /**
     * Standard login with email/password
     */
    const login = async (email: string, password: string) => {
        try {
            setLoading(true);
            setError(null);

            // Try API login first
            try {
                const response = await fetch(`${API_BASE_URL}/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Login failed');
                }

                const authUser: AuthUser = {
                    id: data.user.id || data.user._id,
                    name: data.user.name,
                    email: data.user.email,
                    role: data.user.role,
                    site: data.user.site,
                    avatar: data.user.avatar,
                    permissions: data.user.permissions || [],
                    token: data.token
                };

                // Save to state and localStorage
                setUser(authUser);
                localStorage.setItem('auth_token', data.token);
                localStorage.setItem('auth_user', JSON.stringify(authUser));
                return;
            } catch (apiError) {
                // If API fails and demo mode is enabled, fallback to demo user
                if (DEMO_MODE) {
                    console.warn('Backend unavailable, using demo mode');
                    // Find matching demo user by email
                    const demoUser = Object.values(DEMO_USERS).find(u => u.email === email);
                    if (demoUser && demoUser.token) {
                        setUser(demoUser);
                        localStorage.setItem('auth_token', demoUser.token);
                        localStorage.setItem('auth_user', JSON.stringify(demoUser));
                        return;
                    }
                }
                throw apiError;
            }
        } catch (err: any) {
            setError(err.message || 'Login failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Demo login for role-based testing
     */
    const demoLogin = async (role: UserRole) => {
        try {
            setLoading(true);
            setError(null);

            // Try API demo login first
            try {
                const response = await fetch(`${API_BASE_URL}/auth/demo-login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ role }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Demo login failed');
                }

                const authUser: AuthUser = {
                    id: data.user.id || data.user._id,
                    name: data.user.name,
                    email: data.user.email,
                    role: data.user.role,
                    site: data.user.site,
                    avatar: data.user.avatar,
                    permissions: data.user.permissions || [],
                    token: data.token
                };

                setUser(authUser);
                localStorage.setItem('auth_token', data.token);
                localStorage.setItem('auth_user', JSON.stringify(authUser));
                return;
            } catch (apiError) {
                // If API fails, use local demo users (frontend-only mode)
                console.warn('Backend unavailable, using frontend-only demo mode');
                const demoUser = DEMO_USERS[role];
                if (demoUser && demoUser.token) {
                    setUser(demoUser);
                    localStorage.setItem('auth_token', demoUser.token);
                    localStorage.setItem('auth_user', JSON.stringify(demoUser));
                    return;
                }
                throw new Error(`Demo user not found for role: ${role}`);
            }
        } catch (err: any) {
            setError(err.message || 'Demo login failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Logout user
     */
    const logout = () => {
        setUser(null);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        setError(null);
    };

    /**
     * Update user data
     */
    const updateUser = (updates: Partial<AuthUser>) => {
        if (!user) return;

        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        localStorage.setItem('auth_user', JSON.stringify(updatedUser));
    };

    /**
     * Check if user has a specific permission
     */
    const checkPermission = (permission: string): boolean => {
        if (!user) return false;
        return hasPermission(user.permissions, permission);
    };

    /**
     * Check if user has a specific role
     */
    const isRole = (role: UserRole | UserRole[]): boolean => {
        if (!user) return false;

        if (Array.isArray(role)) {
            return role.includes(user.role);
        }

        return user.role === role;
    };

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        login,
        demoLogin,
        logout,
        updateUser,
        hasPermission: checkPermission,
        isRole,
        loading,
        error
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Hook to use auth context
 */
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

/**
 * HOC to protect routes/components
 */
export function withAuth<P extends object>(
    Component: React.ComponentType<P>,
    requiredRole?: UserRole | UserRole[]
) {
    return (props: P) => {
        const { user, isRole } = useAuth();

        if (!user) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-slate-900">
                    <div className="text-white text-center">
                        <i className="fa-solid fa-lock text-4xl mb-4"></i>
                        <p className="text-lg">Authentication required</p>
                    </div>
                </div>
            );
        }

        if (requiredRole && !isRole(requiredRole)) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-slate-900">
                    <div className="text-white text-center">
                        <i className="fa-solid fa-ban text-4xl mb-4 text-red-500"></i>
                        <p className="text-lg">Access denied</p>
                        <p className="text-sm text-slate-400 mt-2">
                            Required role: {Array.isArray(requiredRole) ? requiredRole.join(' or ') : requiredRole}
                        </p>
                    </div>
                </div>
            );
        }

        return <Component {...props} />;
    };
}

/**
 * Component to conditionally render based on permissions
 */
export const PermissionGuard: React.FC<{
    children: ReactNode;
    permission?: string;
    role?: UserRole | UserRole[];
    fallback?: ReactNode;
}> = ({ children, permission, role, fallback = null }) => {
    const { hasPermission, isRole } = useAuth();

    if (permission && !hasPermission(permission)) {
        return <>{fallback}</>;
    }

    if (role && !isRole(role)) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
};
