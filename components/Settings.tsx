import React, { useState } from 'react';
import { BusinessConfig } from '@/types';
import { Save, Wand2, Link2, Bell } from 'lucide-react';
const Settings = ({ config, onSave }: { config: BusinessConfig, onSave: (c: BusinessConfig) => void }) => {
  const [local, setLocal] = useState(config);
  return (<div className="p-4 bg-white rounded-2xl border shadow-sm"><h2 className="font-bold text-xl mb-4">Settings</h2><textarea className="w-full p-4 border rounded-xl" value={local.replyMessage} onChange={e => setLocal({...local, replyMessage: e.target.value})} /><button onClick={() => onSave(local)} className="bg-indigo-600 text-white p-4 mt-4 rounded-xl">Save</button></div>);
};
export default Settings;
