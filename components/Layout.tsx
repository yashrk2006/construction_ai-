
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MOCK_USER, COLORS } from '../constants';
import LanguageSwitcher from './LanguageSwitcher';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { t } = useTranslation();

  const menuItems = [
    { id: 'dashboard', label: t('dashboard'), icon: 'fa-gauge-high' },
    { id: 'tasks', label: t('tasks'), icon: 'fa-list-check' },
    { id: 'materials', label: t('materials'), icon: 'fa-boxes-stacked' },
    { id: 'workforce', label: t('workforce'), icon: 'fa-users-gear' },
    { id: 'safety', label: t('safety'), icon: 'fa-helmet-safety' },
    { id: 'reports', label: t('reports'), icon: 'fa-file-lines' },
  ];

  return (
    <div className="flex h-screen bg-[#F4F4F4] overflow-hidden text-slate-900">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-72' : 'w-20'} bg-[#1A1A1A] text-white transition-all duration-300 flex flex-col z-20 shadow-2xl border-r border-white/5`}>
        {/* Logo Section with Indian Tricolor */}
        <div className="h-20 flex items-center px-6 border-b border-white/5 bg-[#000] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 flex">
            <div className="flex-1 bg-[#FF9933]"></div>
            <div className="flex-1 bg-white"></div>
            <div className="flex-1 bg-[#138808]"></div>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-[#FF9933] via-white to-[#138808] rounded flex items-center justify-center mr-3 shadow-[0_0_15px_rgba(255,153,51,0.3)]">
            <i className="fa-solid fa-hard-hat text-[#000] text-xl"></i>
          </div>
          {isSidebarOpen && (
            <div className="flex flex-col">
              <span className="font-industrial text-xl leading-none font-bold tracking-wider">
                BuildSmart <span className="text-[#FF9933]">AI</span>
              </span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Field Management</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded transition-all group relative overflow-hidden ${activeTab === item.id
                ? 'bg-[#FF9933] text-[#000] font-bold shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
            >
              <i className={`fa-solid ${item.icon} w-6 text-center text-lg ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110 transition-transform'}`}></i>
              {isSidebarOpen && <span className="font-industrial tracking-wide text-sm">{item.label}</span>}
              {activeTab === item.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#000]"></div>}
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 bg-[#000] border-t border-white/5">
          <div className="flex items-center gap-3 p-2 rounded hover:bg-white/5 transition-colors cursor-pointer">
            <div className="relative">
              <img src={MOCK_USER.avatar} alt="Profile" className="w-10 h-10 rounded bg-[#333] border border-white/10" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-[#000] rounded-full"></div>
            </div>
            {isSidebarOpen && (
              <div className="overflow-hidden">
                <p className="text-xs font-bold truncate uppercase tracking-tight">{MOCK_USER.name}</p>
                <p className="text-[10px] text-slate-500 truncate font-industrial">{MOCK_USER.role}</p>
              </div>
            )}
            {isSidebarOpen && <i className="fa-solid fa-chevron-right text-[10px] text-slate-600 ml-auto"></i>}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Indian Tricolor Bar */}
        <div className="h-1 flex">
          <div className="flex-1 bg-[#FF9933]"></div>
          <div className="flex-1 bg-white"></div>
          <div className="flex-1 bg-[#138808]"></div>
        </div>

        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-sm z-10">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 rounded text-slate-600 border border-slate-100 transition-colors"
            >
              <i className={`fa-solid ${isSidebarOpen ? 'fa-indent' : 'fa-outdent'}`}></i>
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            <div>
              <h1 className="text-xl font-industrial font-bold text-slate-800 tracking-tight capitalize">{menuItems.find(m => m.id === activeTab)?.label}</h1>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">{t('location')}:</span>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{MOCK_USER.site}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <LanguageSwitcher />
            <div className="hidden md:flex flex-col items-end mr-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('status')}</span>
              <span className="text-xs font-bold text-green-600 uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                {t('operational')}
              </span>
            </div>
            <button className="relative w-10 h-10 flex items-center justify-center rounded text-slate-500 hover:text-[#FF9933] hover:bg-slate-50 border border-slate-100 transition-all">
              <i className="fa-solid fa-bell"></i>
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#D32F2F] rounded-full border border-white"></span>
            </button>
            <button className="hidden sm:flex items-center gap-2 bg-[#FF9933] text-[#000] px-4 py-2 rounded font-industrial text-sm font-bold shadow-[0_4px_0_#E67E00] active:translate-y-0.5 active:shadow-none transition-all">
              <i className="fa-solid fa-plus-circle"></i>
              {t('logIncident')}
            </button>
          </div>
        </header>

        {/* View Container */}
        <div className="flex-1 overflow-y-auto p-8 bg-[#F8F9FA] scroll-smooth custom-scrollbar">
          <div className="max-w-7xl mx-auto pb-12">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
