

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MOCK_USER, COLORS } from '../constants';
import LanguageSwitcher from './LanguageSwitcher';
import RoleSwitcher from './RoleSwitcher';
import { User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: User;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, user, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useTranslation();

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile && !isSidebarOpen) {
        setIsSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // All menu items with role-based filtering
  const allMenuItems = [
    { id: 'dashboard', label: t('dashboard'), icon: 'fa-gauge-high', roles: ['Admin', 'Project Manager', 'Supervisor', 'Worker'] },
    { id: 'installation', label: 'QA Analysis', icon: 'fa-ruler-combined', roles: ['Admin', 'Project Manager'] },
    { id: 'tasks', label: t('tasks'), icon: 'fa-list-check', roles: ['Admin', 'Project Manager', 'Supervisor', 'Worker'] },
    { id: 'materials', label: t('materials'), icon: 'fa-boxes-stacked', roles: ['Admin', 'Project Manager'] },
    { id: 'workforce', label: t('workforce'), icon: 'fa-users-gear', roles: ['Admin', 'Project Manager', 'Supervisor'] },
    { id: 'safety', label: t('safety'), icon: 'fa-helmet-safety', roles: ['Admin', 'Project Manager', 'Supervisor', 'Worker'] },
    { id: 'reports', label: t('reports'), icon: 'fa-file-lines', roles: ['Admin', 'Project Manager'] },
  ];

  // Filter menu items based on user role
  const menuItems = user
    ? allMenuItems.filter(item => item.roles.includes(user.role))
    : allMenuItems;

  const handleMenuClick = (tabId: string) => {
    setActiveTab(tabId);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#F4F4F4] overflow-hidden text-slate-900">
      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        ${isMobile ? 'fixed inset-y-0 left-0 z-40' : 'relative'}
        ${isSidebarOpen ? 'w-72' : '-translate-x-full md:translate-x-0 md:w-20'}
        bg-[#1A1A1A] text-white transition-all duration-300 flex flex-col shadow-2xl border-r border-white/5
      `}>
        {/* Logo Section */}
        <div className="h-16 md:h-20 flex items-center px-4 md:px-6 border-b border-white/5 bg-[#000] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 flex">
            <div className="flex-1 bg-[#FF9933]"></div>
            <div className="flex-1 bg-white"></div>
            <div className="flex-1 bg-[#138808]"></div>
          </div>
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-[#FF9933] via-white to-[#138808] rounded flex items-center justify-center mr-2 md:mr-3 shadow-[0_0_15px_rgba(255,153,51,0.3)] shrink-0">
            <i className="fa-solid fa-hard-hat text-[#000] text-lg md:text-xl"></i>
          </div>
          {(isSidebarOpen || !isMobile) && (
            <div className="flex flex-col min-w-0">
              <span className="font-industrial text-lg md:text-xl leading-none font-bold tracking-wider truncate">
                BuildSmart <span className="text-[#FF9933]">AI</span>
              </span>
              <span className="text-[9px] md:text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1 truncate">Field Management</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 md:py-6 px-2 md:px-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`w-full flex items-center gap-3 md:gap-4 px-3 md:px-4 py-3 md:py-3.5 rounded transition-all group relative overflow-hidden ${activeTab === item.id
                ? 'bg-[#FF9933] text-[#000] font-bold shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
            >
              <i className={`fa-solid ${item.icon} w-5 md:w-6 text-center text-base md:text-lg ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110 transition-transform'} shrink-0`}></i>
              {(isSidebarOpen || !isMobile) && <span className="font-industrial tracking-wide text-sm truncate">{item.label}</span>}
              {activeTab === item.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#000]"></div>}
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-3 md:p-4 bg-[#000] border-t border-white/5">
          <div className="flex items-center gap-2 md:gap-3 p-2 rounded hover:bg-white/5 transition-colors cursor-pointer">
            <div className="relative shrink-0">
              <img src={MOCK_USER.avatar} alt="Profile" className="w-8 h-8 md:w-10 md:h-10 rounded bg-[#333] border border-white/10" />
              <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 border-2 border-[#000] rounded-full"></div>
            </div>
            {(isSidebarOpen || !isMobile) && (
              <div className="overflow-hidden min-w-0 flex-1">
                <p className="text-xs font-bold truncate uppercase tracking-tight">{user.name}</p>
                <p className="text-[9px] md:text-[10px] text-slate-500 truncate font-industrial">{user.role}</p>
              </div>
            )}
            {(isSidebarOpen || !isMobile) && (
              <button onClick={onLogout} title="Logout" className="shrink-0 hover:text-red-400 transition-colors">
                <i className="fa-solid fa-right-from-bracket text-xs"></i>
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Tricolor Bar */}
        <div className="h-0.5 md:h-1 flex">
          <div className="flex-1 bg-[#FF9933]"></div>
          <div className="flex-1 bg-white"></div>
          <div className="flex-1 bg-[#138808]"></div>
        </div>

        {/* Header */}
        <header className="h-14 md:h-20 bg-white border-b border-slate-200 px-3 md:px-8 flex items-center justify-between shadow-sm z-10">
          <div className="flex items-center gap-2 md:gap-6 min-w-0 flex-1">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center hover:bg-slate-100 rounded text-slate-600 border border-slate-100 transition-colors shrink-0"
            >
              <i className={`fa-solid ${isSidebarOpen ? 'fa-times' : 'fa-bars'} md:fa-${isSidebarOpen ? 'indent' : 'outdent'}`}></i>
            </button>
            <div className="h-6 md:h-8 w-px bg-slate-200 hidden sm:block"></div>
            <div className="min-w-0 flex-1">
              <h1 className="text-base md:text-xl font-industrial font-bold text-slate-800 tracking-tight capitalize truncate">{menuItems.find(m => m.id === activeTab)?.label}</h1>
              <div className="flex items-center gap-1 md:gap-2">
                <span className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase">{t('location')}:</span>
                <span className="text-[8px] md:text-[10px] font-bold text-blue-600 uppercase tracking-widest truncate">{user.site}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <div className="hidden lg:flex flex-col items-end mr-2">
              <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('status')}</span>
              <span className="text-[10px] md:text-xs font-bold text-[#F5C518] uppercase flex items-center gap-1">
                <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-[#F5C518] rounded-full animate-pulse"></span>
                {t('operational')}
              </span>
            </div>
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            <RoleSwitcher />
            <button className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded text-slate-500 hover:text-[#FF9933] hover:bg-slate-50 border border-slate-100 transition-all">
              <i className="fa-solid fa-bell text-sm md:text-base"></i>
              <span className="absolute top-1 right-1 md:top-2 md:right-2 w-1.5 h-1.5 md:w-2 md:h-2 bg-[#D32F2F] rounded-full border border-white"></span>
            </button>
            <button className="hidden lg:flex items-center gap-2 bg-[#FF9933] text-[#000] px-3 md:px-4 py-1.5 md:py-2 rounded font-industrial text-xs md:text-sm font-bold shadow-[0_3px_0_#E67E00] md:shadow-[0_4px_0_#E67E00] active:translate-y-0.5 active:shadow-none transition-all">
              <i className="fa-solid fa-plus-circle"></i>
              <span className="hidden xl:inline">{t('logIncident')}</span>
            </button>
          </div>
        </header>

        {/* View Container */}
        <div className="flex-1 overflow-y-auto p-3 md:p-8 bg-[#F8F9FA] scroll-smooth custom-scrollbar">
          <div className="max-w-7xl mx-auto pb-6 md:pb-12">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
