import React, { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import LoginEnhanced from './pages/LoginEnhanced';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Materials from './pages/Materials';
import Workforce from './pages/Workforce';
import SafetyAI from './pages/SafetyAI';
import Reports from './pages/Reports';
import InstallationAnalysis from './pages/InstallationAnalysis';

/**
 * Enhanced App Component with Auth Integration
 * Now using the unified enhanced dashboard with Command Center and advanced widgets
 */
const AppEnhanced: React.FC = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('dashboard');

    // Show login if not authenticated
    if (!isAuthenticated || !user) {
        return <LoginEnhanced />;
    }

    // Render content based on active tab
    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <Dashboard />;
            case 'tasks':
                return <Tasks />;
            case 'materials':
                return <Materials />;
            case 'workforce':
                return <Workforce />;
            case 'safety':
                return <SafetyAI />;
            case 'reports':
                return <Reports />;
            case 'installation':
                return <InstallationAnalysis />;
            default:
                return <Dashboard />;
        }
    };

    // Convert AuthUser to User type for Layout compatibility
    const layoutUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        site: user.site,
        avatar: user.avatar
    };

    return (
        <Layout
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            user={layoutUser as any}
            onLogout={logout}
        >
            <div className="animate-in fade-in duration-500 h-full">
                {renderContent()}
            </div>
        </Layout>
    );
};

export default AppEnhanced;
