
import React from 'react';
import { LeadMessage } from '../types';
import { Instagram, Facebook, Calendar, CheckCircle, Clock, ExternalLink } from 'lucide-react';

interface LeadInboxProps {
  messages: LeadMessage[];
}

const LeadInbox: React.FC<LeadInboxProps> = ({ messages }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Leads Inbox</h1>
          <p className="text-slate-500">View and manage the leads captured by your auto-responder.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-50">Export CSV</button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
            <tr>
              <th className="px-6 py-4 font-semibold">Lead Source</th>
              <th className="px-6 py-4 font-semibold">Message Content</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Conversion</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {messages.map((msg) => (
              <tr key={msg.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${msg.platform === 'instagram' ? 'bg-pink-50 text-pink-600' : 'bg-blue-50 text-blue-600'}`}>
                      {msg.platform === 'instagram' ? <Instagram className="w-4 h-4" /> : <Facebook className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{msg.senderName}</p>
                      <p className="text-xs text-slate-400 capitalize">{msg.platform}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-600 line-clamp-1 italic">"{msg.text}"</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(msg.timestamp).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {msg.status === 'replied' ? (
                      <span className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold">
                        <CheckCircle className="w-3 h-3" />
                        Auto-Replied
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-bold">
                        <Clock className="w-3 h-3" />
                        Follow-up Sent
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {msg.clickedLink ? (
                    <span className="flex items-center gap-1 text-indigo-600 text-xs font-bold underline cursor-pointer">
                      <ExternalLink className="w-3 h-3" />
                      Clicked Booking Link
                    </span>
                  ) : (
                    <span className="text-slate-400 text-xs font-medium italic">Pending Click</span>
                  )}
                </td>
              </tr>
            ))}
            {messages.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-20 text-center text-slate-400 font-medium">
                  No leads tracked yet. Your messages from Meta will appear here.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadInbox;
