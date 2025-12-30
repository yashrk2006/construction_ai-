
import React, { useState } from 'react';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Materials from './pages/Materials';
import Workforce from './pages/Workforce';
import SafetyAI from './pages/SafetyAI';
import Reports from './pages/Reports';
import InstallationAnalysis from './pages/InstallationAnalysis';
import { User } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('dashboard');
  };

  // Show login if no user is logged in
  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'tasks': return <Tasks />;
      case 'materials': return <Materials />;
      case 'workforce': return <Workforce />;
      case 'safety': return <SafetyAI />;
      case 'reports': return <Reports />;
      case 'installation': return <InstallationAnalysis />;
      default: return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} user={currentUser} onLogout={handleLogout}>
      <div className="animate-in fade-in duration-500 h-full">
        {renderContent()}
      </div>
    </Layout>
  );
};

export default App;
