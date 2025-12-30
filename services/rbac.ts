/**
 * Role-Based Access Control Service
 * Centralized authorization logic for frontend components
 */

export type UserRole = 'Admin' | 'Project Manager' | 'Supervisor' | 'Worker';

export interface Permission {
    name: string;
    description: string;
}

export interface RoleDefinition {
    title: string;
    description: string;
    dashboardType: 'executive' | 'management' | 'operational' | 'field';
    permissions: string[];
    features: string[];
    navigationItems: string[];
    primaryColor: string;
    icon: string;
}

/**
 * Complete role definitions with permissions and capabilities
 */
export const ROLE_DEFINITIONS: Record<UserRole, RoleDefinition> = {
    'Admin': {
        title: 'Executive Dashboard',
        description: 'Complete system oversight and control',
        dashboardType: 'executive',
        permissions: [
            'view_budget',
            'manage_users',
            'approve_tasks',
            'view_all_tasks',
            'view_reports',
            'view_safety',
            'technical_review',
            'assign_tasks',
            'manage_materials',
            'manage_workforce',
            'system_settings'
        ],
        features: [
            'budget_analytics',
            'user_management',
            'system_configuration',
            'advanced_reports',
            'all_projects',
            'quality_control',
            'audit_logs'
        ],
        navigationItems: ['dashboard', 'installation', 'tasks', 'materials', 'workforce', 'safety', 'reports'],
        primaryColor: '#DC2626',
        icon: 'fa-user-shield'
    },
    'Project Manager': {
        title: 'Project Management Dashboard',
        description: 'Planning, scheduling & comprehensive reporting',
        dashboardType: 'management',
        permissions: [
            'view_budget',
            'approve_tasks',
            'view_all_tasks',
            'view_reports',
            'view_safety',
            'assign_tasks',
            'manage_materials',
            'manage_workforce'
        ],
        features: [
            'project_planning',
            'resource_scheduling',
            'progress_reports',
            'budget_view',
            'team_analytics',
            'material_management'
        ],
        navigationItems: ['dashboard', 'installation', 'tasks', 'materials', 'workforce', 'safety', 'reports'],
        primaryColor: '#2563EB',
        icon: 'fa-user-tie'
    },
    'Supervisor': {
        title: 'Site Supervision Dashboard',
        description: 'Team coordination & task management',
        dashboardType: 'operational',
        permissions: [
            'assign_tasks',
            'view_all_tasks',
            'view_safety',
            'upload_photos',
            'manage_workforce'
        ],
        features: [
            'task_assignment',
            'team_management',
            'attendance_tracking',
            'safety_checks',
            'progress_monitoring'
        ],
        navigationItems: ['dashboard', 'tasks', 'workforce', 'safety'],
        primaryColor: '#F59E0B',
        icon: 'fa-user-gear'
    },
    'Worker': {
        title: 'Field Worker Dashboard',
        description: 'Task execution & daily reporting',
        dashboardType: 'field',
        permissions: [
            'view_safety',
            'upload_photos',
            'view_my_tasks'
        ],
        features: [
            'my_tasks',
            'safety_checkin',
            'photo_upload',
            'material_request',
            'attendance'
        ],
        navigationItems: ['dashboard', 'tasks', 'safety'],
        primaryColor: '#16A34A',
        icon: 'fa-user-hard-hat'
    }
};

/**
 * Permission definitions
 */
export const PERMISSIONS = {
    VIEW_BUDGET: 'view_budget',
    MANAGE_USERS: 'manage_users',
    APPROVE_TASKS: 'approve_tasks',
    VIEW_ALL_TASKS: 'view_all_tasks',
    VIEW_REPORTS: 'view_reports',
    UPLOAD_PHOTOS: 'upload_photos',
    VIEW_SAFETY: 'view_safety',
    TECHNICAL_REVIEW: 'technical_review',
    ASSIGN_TASKS: 'assign_tasks',
    MANAGE_MATERIALS: 'manage_materials',
    MANAGE_WORKFORCE: 'manage_workforce',
    SYSTEM_SETTINGS: 'system_settings',
    VIEW_MY_TASKS: 'view_my_tasks'
} as const;

/**
 * Check if a user has a specific permission
 */
export function hasPermission(userPermissions: string[], permission: string): boolean {
    return userPermissions.includes(permission);
}

/**
 * Check if user has any of the specified permissions
 */
export function hasAnyPermission(userPermissions: string[], permissions: string[]): boolean {
    return permissions.some(p => userPermissions.includes(p));
}

/**
 * Check if user has all of the specified permissions
 */
export function hasAllPermissions(userPermissions: string[], permissions: string[]): boolean {
    return permissions.every(p => userPermissions.includes(p));
}

/**
 * Get role definition for a user role
 */
export function getRoleDefinition(role: UserRole): RoleDefinition {
    return ROLE_DEFINITIONS[role];
}

/**
 * Check if user can access a specific navigation item
 */
export function canAccessNavItem(role: UserRole, navItem: string): boolean {
    const definition = ROLE_DEFINITIONS[role];
    return definition.navigationItems.includes(navItem);
}

/**
 * Get filtered navigation items for a role
 */
export function getNavigationItems(role: UserRole): string[] {
    return ROLE_DEFINITIONS[role].navigationItems;
}

/**
 * Check if user can view another user's data
 */
export function canViewUser(viewerRole: UserRole, targetRole: UserRole): boolean {
    const hierarchy: UserRole[] = ['Admin', 'Project Manager', 'Supervisor', 'Worker'];
    const viewerLevel = hierarchy.indexOf(viewerRole);
    const targetLevel = hierarchy.indexOf(targetRole);

    // Can view users at same level or below
    return viewerLevel <= targetLevel;
}

/**
 * Get dashboard configuration for role
 */
export function getDashboardConfig(role: UserRole) {
    const definition = ROLE_DEFINITIONS[role];
    return {
        type: definition.dashboardType,
        title: definition.title,
        description: definition.description,
        primaryColor: definition.primaryColor,
        widgets: getAvailableWidgets(role)
    };
}

/**
 * Get available dashboard widgets based on role
 */
function getAvailableWidgets(role: UserRole): string[] {
    const widgetMap: Record<string, string[]> = {
        'executive': ['ai_predictions', 'budget_overview', 'project_status', 'team_analytics', 'critical_tasks', 'inventory_alerts', 'safety_summary', 'timeline'],
        'management': ['ai_predictions', 'project_status', 'team_analytics', 'critical_tasks', 'inventory_alerts', 'safety_summary', 'progress_charts'],
        'operational': ['team_status', 'task_overview', 'attendance', 'safety_checklist', 'daily_progress'],
        'field': ['my_tasks', 'attendance', 'safety_alerts', 'task_progress']
    };

    const definition = ROLE_DEFINITIONS[role];
    return widgetMap[definition.dashboardType] || [];
}

/**
 * Validate if user can perform action on resource
 */
export function canPerformAction(
    userRole: UserRole,
    userPermissions: string[],
    action: string,
    resourceType: string
): boolean {
    // Admin can do everything
    if (userRole === 'Admin') {
        return true;
    }

    // Map actions to required permissions
    const permissionMap: Record<string, string> = {
        'create_task': PERMISSIONS.ASSIGN_TASKS,
        'edit_task': PERMISSIONS.VIEW_ALL_TASKS,
        'delete_task': PERMISSIONS.ASSIGN_TASKS,
        'manage_user': PERMISSIONS.MANAGE_USERS,
        'edit_material': PERMISSIONS.MANAGE_MATERIALS,
        'edit_workforce': PERMISSIONS.MANAGE_WORKFORCE,
        'approve': PERMISSIONS.APPROVE_TASKS,
        'view_reports': PERMISSIONS.VIEW_REPORTS,
        'view_budget': PERMISSIONS.VIEW_BUDGET
    };

    const requiredPermission = permissionMap[action];
    return requiredPermission ? hasPermission(userPermissions, requiredPermission) : false;
}

/**
 * Get safe display data for user role
 */
export function getRoleSafeData<T>(
    role: UserRole,
    data: T,
    sensitiveFields: string[]
): Partial<T> {
    if (role === 'Admin') {
        return data;
    }

    const safeCopy = { ...data };
    sensitiveFields.forEach(field => {
        delete (safeCopy as any)[field];
    });

    return safeCopy;
}
