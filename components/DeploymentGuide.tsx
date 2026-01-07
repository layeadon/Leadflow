import React, { useState, useEffect } from 'react';
import { 
  Rocket, Database, Zap, Copy, Check, 
  Code, Globe, Settings as SettingsIcon,
  RefreshCw, Github, Monitor,
  FileCode, Layers, Layout, Shield, Box
} from 'lucide-react';
import { BusinessConfig } from '../types';
import { isFirebaseReady } from '../services/firebase';

const ShieldCheck = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
);

interface DeploymentGuideProps {
  isLive: boolean;
  onLaunch: () => void;
  config: BusinessConfig;
  updateConfig: (config: BusinessConfig) => void;
  setActiveTab: (tab: string) => void;
}

const DeploymentGuide: React.FC<DeploymentGuideProps> = ({ isLive, onLaunch, config, updateConfig, setActiveTab }) => {
  const [copiedFile, setCopiedFile] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'waiting'>('checking');
  
  useEffect(() => {
    const check = () => {
      setConnectionStatus(isFirebaseReady() ? 'connected' : 'waiting');
    };
    check();
    const interval = setInterval(check, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyCode = (id: string) => {
    const content = FILE_CONTENTS[id] || "// Source not available for this placeholder";
    navigator.clipboard.writeText(content);
    setCopiedFile(id);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  const codeSnippets = {
    'clone': `npm install\nnpm run dev`
  };

  const fileRegistry = [
    { id: 'package.json', name: 'package.json', icon: FileCode, category: 'Config' },
    { id: 'tsconfig.json', name: 'tsconfig.json', icon: SettingsIcon, category: 'Config' },
    { id: 'vite.config.ts', name: 'vite.config.ts', icon: SettingsIcon, category: 'Config' },
    { id: 'index.html', name: 'index.html', icon: Globe, category: 'Entry' },
    { id: 'firebase.ts', name: 'services/firebase.ts', icon: Shield, category: 'Services' },
    { id: 'App.tsx', name: 'App.tsx', icon: Layout, category: 'Core' },
    { id: 'types.ts', name: 'types.ts', icon: Layers, category: 'Logic' },
    { id: 'dashboard.tsx', name: 'components/Dashboard.tsx', icon: Box, category: 'UI' }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto pb-32 space-y-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Deployment Hub</h1>
          <p className="text-slate-500 text-lg max-w-2xl">Transfer your code to VS Code to fix all "red" errors.</p>
        </div>
        
        <div className={`px-6 py-4 rounded-[24px] border-2 flex items-center gap-4 transition-all ${
          connectionStatus === 'connected' 
          ? 'bg-green-50 border-green-200 text-green-700 shadow-lg shadow-green-100' 
          : 'bg-amber-50 border-amber-200 text-amber-700'
        }`}>
          {connectionStatus === 'connected' ? <ShieldCheck size={24} /> : <RefreshCw size={24} className="animate-spin" />}
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">Database Link</p>
            <p className="text-sm font-bold">
              {connectionStatus === 'connected' ? 'Cloud Persistence Active' : 'Waiting for Config...'}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border-2 border-slate-200 rounded-[40px] p-10 shadow-sm space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
            <Code size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">Source Code Explorer</h2>
            <p className="text-sm text-slate-500 font-medium">Use these updated files to clear VS Code errors.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fileRegistry.map((file) => (
            <div key={file.id} className="group p-4 bg-slate-50 border border-slate-100 rounded-[24px] hover:border-indigo-300 hover:bg-white transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-white rounded-xl shadow-sm group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                  <file.icon size={18} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{file.category}</span>
              </div>
              <p className="text-sm font-bold text-slate-800 mb-4 truncate">{file.name}</p>
              <button 
                onClick={() => handleCopyCode(file.id)}
                className="w-full py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 flex items-center justify-center gap-2 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm"
              >
                {copiedFile === file.id ? (
                  <>
                    <Check size={14} className="text-green-500" />
                    COPIED!
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    COPY SOURCE
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-10">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-indigo-600 rounded-3xl flex items-center justify-center">
              <Monitor size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tight">Final Launch Sequence</h2>
              <p className="text-slate-400 font-medium">Clear those red errors once and for all.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4 p-6 bg-white/5 rounded-3xl border border-white/10">
              <h3 className="font-bold text-lg">1. Fix tsconfig.json</h3>
              <p className="text-sm text-slate-400">Copy the new <b>tsconfig.json</b> from the Explorer above to your root folder.</p>
            </div>
            <div className="space-y-4 p-6 bg-white/5 rounded-3xl border border-white/10">
              <h3 className="font-bold text-lg">2. Clean index.html</h3>
              <p className="text-sm text-slate-400">Ensure your <b>index.html</b> does NOT contain an "importmap" script.</p>
            </div>
            <div className="space-y-4 p-6 bg-white/5 rounded-3xl border border-white/10">
              <h3 className="font-bold text-lg">3. Install Deps</h3>
              <p className="text-sm text-slate-400">Run <code>npm install</code> one more time in your terminal.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8">
        <div className={`p-8 rounded-[40px] flex flex-col md:flex-row items-center gap-8 shadow-sm border-2 transition-all ${
          connectionStatus === 'connected' ? 'bg-green-50 border-green-100' : 'bg-white border-slate-100'
        }`}>
           <Database size={40} className={connectionStatus === 'connected' ? 'text-green-600' : 'text-slate-300'} />
           <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-slate-900">
                {connectionStatus === 'connected' ? 'Cloud Link Ready' : 'Database Connection Pending'}
              </h3>
              <p className="text-sm text-slate-500">
                {connectionStatus === 'connected' ? 'VS Code should now see Firebase types.' : 'Check services/firebase.ts for correct keys.'}
              </p>
           </div>
           <button onClick={onLaunch} disabled={connectionStatus !== 'connected'} className={`px-10 py-5 rounded-[24px] font-black text-lg transition-all ${
             connectionStatus === 'connected' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-400'
           }`}>
            GO LIVE
          </button>
        </div>
      </div>
    </div>
  );
};

const FILE_CONTENTS: Record<string, string> = {
  'tsconfig.json': `{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "types": ["vite/client"]
  },
  "include": [".", "index.tsx", "vite.config.ts"],
  "references": [{ "path": "./tsconfig.node.json" }]
}`,
  'firebase.ts': `import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "PASTE_YOUR_API_KEY_HERE",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

export const isFirebaseReady = () => {
  const isPlaceholder = firebaseConfig.apiKey === "AIzaSyCKsusVThJ9_gTlFOxRYQiPB8Mx77YFDoM";
  const isEmpty = !firebaseConfig.apiKey || firebaseConfig.apiKey.trim() === "";
  return !isPlaceholder && !isEmpty && firebaseConfig.apiKey.length > 10;
};

let app;
let db;

if (isFirebaseReady()) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
  } catch (error) {
    console.error("Firebase Error", error);
  }
}

export { app, db };`,
  'package.json': `{
  "name": "leadflow-saas",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@google/genai": "^1.34.0",
    "lucide-react": "^0.562.0",
    "react": "^19.2.3",
    "react-dom": "^19.2.3",
    "recharts": "^3.6.0",
    "firebase": "^11.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^5.1.2",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.3.3",
    "vite": "^7.3.1"
  }
}`
};

export default DeploymentGuide;