import React from 'react';

/**
 * RoleSwitcher Component
 * Temporarily disabled as it uses the old UserContext
 * With the new AuthContext, users should logout and login as different roles
 * 
 * To switch roles:
 * 1. Click logout button (profile icon in top-right)
 * 2. Select a different role from the login screen
 */
const RoleSwitcher: React.FC = () => {
    // Return null to disable this component without breaking the layout
    // Users can switch roles by logging out and selecting a different role
    return null;
};

export default RoleSwitcher;
