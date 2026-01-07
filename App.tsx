import React, { useState, useEffect } from 'react';
import { UserProfile, BusinessConfig, LeadMessage } from './types';
import { storageService } from './services/storageService';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import LeadInbox from './components/LeadInbox';
import Simulator from './components/Simulator';
import DeploymentGuide from './components/DeploymentGuide';
import Auth from './components/Auth';
import { Menu, X, Zap, Globe, Shield } from 'lucide-react';

const App: React.FC = () => {
  // We remove the hardcoded object here so it strictly follows storage/login logic
  const [user, setUser] = useState<UserProfile | null>(storageService.getUser());
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [config, setConfig] = useState<BusinessConfig>(storageService.getConfig());
  const [messages, setMessages] = useState<LeadMessage[]>(storageService.getMessages());
  const [isLive, setIsLive] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogin = (newUser: UserProfile) => {
    storageService.setUser(newUser);
    setUser(newUser);
  };

  const handleLogout = () => {
    storageService.logout();
    setUser(null);
  };

  const handleSaveConfig = (newConfig: BusinessConfig) => {
    storageService.saveConfig(newConfig);
    setConfig(newConfig);
  };

  const handleNewMessage = (msg: LeadMessage) => {
    storageService.addMessage(msg);
    setMessages(prev => [msg, ...prev]);
  };

  const handleAction = (id: string, clicked: boolean) => {
    storageService.updateMessageStatus(id, { clickedLink: clicked });
    setMessages(prev => prev.map(m => m.id === id ? { ...m, clickedLink: clicked } : m));
  };

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="flex bg-slate-50 min-h-screen relative overflow-x-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-[60] flex items-center px-6 justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0">
            <Zap className="text-white w-4 h-4 fill-white" />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900">LeadFlow</span>
        </div>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-slate-100 rounded-xl text-slate-600 transition-colors"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-slate-900/40 z-[55] backdrop-blur-[2px] transition-all"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (window.innerWidth < 1024) setSidebarOpen(false);
        }} 
        onLogout={handleLogout} 
        isLive={isLive}
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <main 
        className={`flex-1 p-6 lg:p-10 max-w-7xl mx-auto transition-all duration-300 w-full 
          ${sidebarOpen ? 'lg:ml-64' : 'ml-0'} 
          pt-24 lg:pt-10`}
      >
        <div className="mb-10 flex justify-between items-center">
           {!isLive ? (
              <div className="flex items-center gap-3 px-5 py-2.5 bg-white border border-slate-200 rounded-2xl shadow-sm animate-in fade-in slide-in-from-top-2">
                 <Shield size={16} className="text-slate-400" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Sandbox Mode: Testing Active</span>
              </div>
           ) : (
              <div className="flex items-center gap-3 px-5 py-2.5 bg-green-50 border border-green-100 rounded-2xl shadow-sm text-green-700 animate-in fade-in slide-in-from-top-2">
                 <Globe size={16} className="animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Production Environment: Live</span>
              </div>
           )}
           
           <div className="hidden md:flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs font-black text-slate-900 tracking-tight leading-none">{user.businessName}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Admin Account</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 font-black text-sm">
                {user.businessName[0]}
              </div>
           </div>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          {activeTab === 'dashboard' && <Dashboard messages={messages} isLive={isLive} />}
          {activeTab === 'inbox' && <LeadInbox messages={messages} />}
          {activeTab === 'settings' && (
            <Settings config={config} onSave={handleSaveConfig} />
          )}
          {activeTab === 'simulator' && (
            <Simulator 
              config={config} 
              messages={messages} 
              onNewMessage={handleNewMessage} 
              onAction={handleAction} 
            />
          )}
          {activeTab === 'launch' && (
            <DeploymentGuide 
              isLive={isLive} 
              onLaunch={() => setIsLive(true)} 
              config={config}
              updateConfig={handleSaveConfig}
              setActiveTab={setActiveTab}
            />
          )}
        </div>
      </main>
    </div>
  );
};
export default App;