
import React, { useState } from 'react';
import { BusinessConfig, LeadMessage } from '../types';
import { Send, Smartphone, Instagram, Facebook, Clock, MousePointer2 } from 'lucide-react';

interface SimulatorProps {
  config: BusinessConfig;
  onNewMessage: (message: LeadMessage) => void;
  messages: LeadMessage[];
  onAction: (id: string, clicked: boolean) => void;
}

const Simulator: React.FC<SimulatorProps> = ({ config, onNewMessage, messages, onAction }) => {
  const [inputText, setInputText] = useState('');
  const [platform, setPlatform] = useState<'instagram' | 'meta'>('instagram');

  const handleSimulateReceive = () => {
    if (!inputText.trim()) return;

    const newLead: LeadMessage = {
      id: Math.random().toString(36).substr(2, 9),
      senderName: 'John Doe',
      platform,
      text: inputText,
      timestamp: new Date().toISOString(),
      status: config.autoReplyEnabled ? 'replied' : 'pending',
      clickedLink: false
    };

    onNewMessage(newLead);
    setInputText('');
  };

  const getFullReply = () => {
    return config.replyMessage.replace('{{link}}', config.bookingLink);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Simulator</h1>
          <p className="text-slate-500">Test how your business responds to new messages in real-time.</p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Platform Source</label>
            <div className="flex gap-4">
              <button 
                onClick={() => setPlatform('instagram')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border transition-all ${
                  platform === 'instagram' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-slate-50 border-slate-200 text-slate-500'
                }`}
              >
                <Instagram className="w-5 h-5" />
                Instagram
              </button>
              <button 
                onClick={() => setPlatform('meta')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border transition-all ${
                  platform === 'meta' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-slate-50 border-slate-200 text-slate-500'
                }`}
              >
                <Facebook className="w-5 h-5" />
                Meta Ads
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Simulate Message Text</label>
            <textarea 
              rows={3}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="e.g. Hi, how much for a consultation?"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none"
            />
          </div>

          <button 
            onClick={handleSimulateReceive}
            className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            Send Test Message
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        {/* Phone UI */}
        <div className="w-[360px] h-[720px] bg-slate-900 rounded-[50px] p-4 border-8 border-slate-800 shadow-2xl relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl"></div>
          
          <div className="bg-white h-full rounded-[36px] flex flex-col overflow-hidden">
            {/* Phone Header */}
            <div className="p-4 border-b border-slate-100 flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold">L</div>
              <div className="flex-1">
                <p className="text-sm font-bold leading-none">Your Business</p>
                <p className="text-[10px] text-green-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  Active now
                </p>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-slate-50">
              {messages.length === 0 && (
                <div className="text-center mt-20 space-y-2 px-6">
                  <div className="w-12 h-12 bg-slate-200 rounded-full mx-auto flex items-center justify-center">
                    <Clock className="w-6 h-6 text-slate-400" />
                  </div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">No Activity Yet</p>
                  <p className="text-xs text-slate-400">Send a test message from the left panel to see magic happen.</p>
                </div>
              )}

              {messages.slice().reverse().map((msg) => (
                <div key={msg.id} className="space-y-4">
                  {/* Incoming */}
                  <div className="flex justify-start">
                    <div className="max-w-[80%] bg-slate-200 p-3 rounded-2xl rounded-tl-none text-xs text-slate-700">
                      {msg.text}
                    </div>
                  </div>
                  
                  {/* Automatic Reply */}
                  {config.autoReplyEnabled && (
                    <div className="flex flex-col items-end gap-1">
                      <div className="max-w-[80%] bg-indigo-600 p-3 rounded-2xl rounded-tr-none text-xs text-white">
                        {getFullReply()}
                        <div 
                          onClick={() => onAction(msg.id, true)}
                          className="mt-2 bg-white/20 p-2 rounded-lg text-white font-semibold cursor-pointer flex items-center justify-center gap-2 hover:bg-white/30"
                        >
                          <MousePointer2 className="w-3 h-3" />
                          Click Link (Simulated)
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 italic">Replied instantly</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-4 border-t border-slate-100 flex items-center gap-2">
              <div className="flex-1 bg-slate-100 rounded-full h-10 px-4"></div>
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
                <Send className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
