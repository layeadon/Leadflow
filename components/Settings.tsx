
import React, { useState } from 'react';
import { BusinessConfig } from '../types';
import { Save, Wand2, Link2, Bell, AlertCircle } from 'lucide-react';
import { aiAssistant } from '../services/aiAssistant';

interface SettingsProps {
  config: BusinessConfig;
  onSave: (config: BusinessConfig) => void;
}

const Settings: React.FC<SettingsProps> = ({ config, onSave }) => {
  const [localConfig, setLocalConfig] = useState<BusinessConfig>(config);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleSave = () => {
    onSave(localConfig);
  };

  const optimizeWithAI = async () => {
    setIsOptimizing(true);
    const optimized = await aiAssistant.optimizeMessage(localConfig.replyMessage, "Service Based Business");
    setLocalConfig(prev => ({ ...prev, replyMessage: optimized }));
    setIsOptimizing(false);
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Reply Settings</h1>
        <p className="text-slate-500">Configure how you interact with your customers automatically.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-slate-800">Auto-Responder Automation</h3>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={localConfig.autoReplyEnabled} 
              onChange={(e) => setLocalConfig({...localConfig, autoReplyEnabled: e.target.checked})}
              className="sr-only peer" 
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              Your Booking/Quote Link
              <Link2 className="w-4 h-4 text-slate-400" />
            </label>
            <input 
              type="url"
              value={localConfig.bookingLink}
              onChange={(e) => setLocalConfig({...localConfig, bookingLink: e.target.value})}
              placeholder="https://calendly.com/your-business"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
            <p className="text-xs text-slate-400 italic">This link will replace the <strong>{"{{link}}"}</strong> tag in your reply.</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700">Auto-Reply Script</label>
              <button 
                onClick={optimizeWithAI}
                disabled={isOptimizing}
                className="text-xs font-semibold text-indigo-600 flex items-center gap-1 hover:text-indigo-700 disabled:opacity-50"
              >
                <Wand2 className="w-3 h-3" />
                {isOptimizing ? 'Optimizing...' : 'Optimize with Gemini AI'}
              </button>
            </div>
            <textarea 
              rows={5}
              value={localConfig.replyMessage}
              onChange={(e) => setLocalConfig({...localConfig, replyMessage: e.target.value})}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
            />
          </div>

          <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-amber-900">24-Hour Smart Follow-Up</p>
              <p className="text-xs text-amber-700">If a lead doesn't reply or book after 24 hours, LeadFlow will send a gentle nudge to stay top of mind.</p>
              <div className="pt-2">
                <button 
                  onClick={() => setLocalConfig({...localConfig, followUpEnabled: !localConfig.followUpEnabled})}
                  className={`text-xs px-3 py-1 rounded-full font-semibold transition-all ${
                    localConfig.followUpEnabled 
                      ? 'bg-amber-200 text-amber-800' 
                      : 'bg-white text-slate-500 border border-slate-200'
                  }`}
                >
                  {localConfig.followUpEnabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button 
            onClick={handleSave}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
