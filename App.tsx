import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import LeadInbox from './components/LeadInbox';
import Simulator from './components/Simulator';
import DeploymentGuide from './components/DeploymentGuide';
import Auth from './components/Auth';
import { storageService } from './services/storageService';

const App = () => {
  const [user, setUser] = useState(storageService.getUser() || { id: 't1', email: 'test@test.com', businessName: 'Test', isLoggedIn: true });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [config, setConfig] = useState(storageService.getConfig());
  const [messages, setMessages] = useState(storageService.getMessages());
  const [isLive, setIsLive] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  if (!user) return <Auth onLogin={u => { storageService.setUser(u); setUser(u); }} />;

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={() => setUser(null)} isLive={isLive} isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />
      <main className="flex-1 p-10 lg:ml-64">
        {activeTab === 'dashboard' && <Dashboard messages={messages} />}
        {activeTab === 'inbox' && <LeadInbox messages={messages} />}
        {activeTab === 'settings' && <Settings config={config} onSave={c => { storageService.saveConfig(c); setConfig(c); }} />}
        {activeTab === 'simulator' && <Simulator config={config} messages={messages} onNewMessage={m => { storageService.addMessage(m); setMessages([m, ...messages]); }} onAction={(id, clk) => storageService.updateMessageStatus(id, { clickedLink: clk })} />}
        {activeTab === 'launch' && <DeploymentGuide isLive={isLive} onLaunch={() => setIsLive(true)} config={config} updateConfig={setConfig} setActiveTab={setActiveTab} />}
      </main>
    </div>
  );
};
export default App;
