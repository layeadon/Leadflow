import React, { useState } from 'react';
import { BusinessConfig, LeadMessage } from '@/types';
import { Send } from 'lucide-react';
const Simulator = ({ config, onNewMessage, messages, onAction }: any) => {
  const [text, setText] = useState('');
  const handleSend = () => onNewMessage({ id: Date.now().toString(), senderName: 'Test', text, timestamp: new Date().toISOString(), status: 'replied', clickedLink: false });
  return (<div className="p-4"><input className="border p-2 mr-2" value={text} onChange={e => setText(e.target.value)} /><button onClick={handleSend} className="bg-indigo-600 text-white px-4 py-2 rounded">Test</button></div>);
};
export default Simulator;
