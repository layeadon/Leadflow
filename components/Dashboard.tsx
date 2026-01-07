import React from 'react';
import { LeadMessage } from '../types';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { TrendingUp, Users, MessageCircle, MousePointer2, Inbox, ShieldCheck } from 'lucide-react';

interface DashboardProps {
  messages: LeadMessage[];
  isLive?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ messages, isLive }) => {
  const stats = {
    total: messages.length,
    replied: messages.filter(m => m.status !== 'pending').length,
    clicks: messages.filter(m => m.clickedLink).length,
    conversion: messages.length > 0 
      ? Math.round((messages.filter(m => m.clickedLink).length / messages.length) * 100) 
      : 0
  };

  const hasData = messages.length > 0;

  const chartData = [
    { name: 'Mon', messages: hasData ? 4 : 0, clicks: hasData ? 1 : 0 },
    { name: 'Tue', messages: hasData ? 7 : 0, clicks: hasData ? 3 : 0 },
    { name: 'Wed', messages: hasData ? 5 : 0, clicks: hasData ? 2 : 0 },
    { name: 'Thu', messages: hasData ? 12 : 0, clicks: hasData ? 8 : 0 },
    { name: 'Fri', messages: stats.total, clicks: stats.clicks },
    { name: 'Sat', messages: 0, clicks: 0 },
    { name: 'Sun', messages: 0, clicks: 0 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Business Overview</h1>
          <p className="text-slate-500">Track how LeadFlow is handling your incoming messages.</p>
        </div>
        {isLive && (
          <div className="bg-indigo-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-100">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Active Production Monitoring</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Total Leads" 
          value={stats.total} 
          icon={<Users className="w-6 h-6 text-blue-600" />} 
          trend={stats.total > 0 ? "+12%" : undefined}
          color="bg-blue-50"
        />
        <StatCard 
          label="Auto-Replies" 
          value={stats.replied} 
          icon={<MessageCircle className="w-6 h-6 text-purple-600" />} 
          trend={stats.replied > 0 ? "+18%" : undefined}
          color="bg-purple-50"
        />
        <StatCard 
          label="Link Clicks" 
          value={stats.clicks} 
          icon={<MousePointer2 className="w-6 h-6 text-green-600" />} 
          trend={stats.clicks > 0 ? "+5%" : undefined}
          color="bg-green-50"
        />
        <StatCard 
          label="Conversion" 
          value={`${stats.conversion}%`} 
          icon={<TrendingUp className="w-6 h-6 text-orange-600" />} 
          trend={stats.conversion > 0 ? "+2%" : undefined}
          color="bg-orange-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
          <h3 className="font-semibold mb-6 text-slate-800">Weekly Activity</h3>
          <div className="h-64 relative">
            {!hasData && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/40 backdrop-blur-[1px]">
                <div className="p-3 bg-slate-50 rounded-full mb-2">
                  <Inbox className="w-6 h-6 text-slate-300" />
                </div>
                <p className="text-sm font-medium text-slate-400">Waiting for first lead...</p>
              </div>
            )}
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorMsgs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                {hasData && (
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                )}
                <Area type="monotone" dataKey="messages" stroke={hasData ? "#4f46e5" : "#e2e8f0"} fillOpacity={1} fill="url(#colorMsgs)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold mb-6 text-slate-800">Recent Leads</h3>
          <div className="space-y-4">
            {messages.slice(0, 5).map((m) => (
              <div key={m.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-medium text-slate-600">
                  {m.senderName[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate text-slate-800">{m.senderName}</p>
                  <p className="text-xs text-slate-500 truncate">{m.text}</p>
                </div>
                <div className={`w-2 h-2 rounded-full ${m.clickedLink ? 'bg-green-500' : 'bg-slate-300'}`}></div>
              </div>
            ))}
            {messages.length === 0 && (
              <div className="text-center py-12 space-y-3">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                  <MessageCircle className="w-6 h-6 text-slate-200" />
                </div>
                <p className="text-xs text-slate-400 font-medium px-4">No incoming leads yet. Use the Simulator tab to test a message.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon, trend, color }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
      {trend && (
        <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-full">{trend}</span>
      )}
    </div>
    <p className="text-slate-500 text-sm font-medium">{label}</p>
    <h4 className="text-2xl font-bold mt-1 text-slate-900">{value}</h4>
  </div>
);

export default Dashboard;