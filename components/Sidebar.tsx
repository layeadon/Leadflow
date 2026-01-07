
import React from 'react';
import { 
  LayoutDashboard, 
  Settings, 
  MessageSquare, 
  PlayCircle, 
  LogOut, 
  Zap,
  Rocket,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  isLive?: boolean;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout, isLive, isOpen, toggleSidebar }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'inbox', icon: MessageSquare, label: 'Leads Inbox' },
    { id: 'settings', icon: Settings, label: 'Reply Settings' },
    { id: 'simulator', icon: PlayCircle, label: 'Test Simulator' },
    { id: 'launch', icon: Rocket, label: 'Launch' },
  ];

  return (
    <>
      <aside 
        className={`fixed left-0 top-0 h-screen bg-white border-r border-slate-200 z-[70] flex flex-col transition-all duration-300 ease-in-out ${
          isOpen 
            ? 'w-64 translate-x-0' 
            : 'w-64 -translate-x-full lg:w-0'
        }`}
      >
        <div className="p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-indigo-100">
                <Zap className="text-white w-5 h-5 fill-white" />
              </div>
              <span className="font-bold text-xl tracking-tight truncate text-slate-900">LeadFlow</span>
            </div>
            <button 
              onClick={toggleSidebar}
              className="hidden lg:flex p-1.5 hover:bg-slate-50 rounded-lg text-slate-400"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
          
          {isLive && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full border border-green-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider">Production Live</span>
            </div>
          )}
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all truncate ${
                activeTab === item.id 
                  ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <item.icon className={`w-5 h-5 shrink-0 ${activeTab === item.id ? 'text-indigo-600' : 'text-slate-400'}`} />
              <span className={activeTab === item.id ? 'text-indigo-900' : 'text-slate-700'}>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 mt-auto">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all truncate"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Desktop Toggle Button */}
      {!isOpen && (
        <button 
          onClick={toggleSidebar}
          className="hidden lg:flex fixed left-4 bottom-4 p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all z-50 animate-in fade-in zoom-in"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </>
  );
};

export default Sidebar;
