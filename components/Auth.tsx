// (Actual code for Auth component)import React, { useState } from 'react';
import { Zap, Mail, Lock, ArrowRight } from 'lucide-react';

const Auth = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const handleSubmit = (e) => { e.preventDefault(); onLogin({ id: 'user_123', email, businessName: 'My Business', isLoggedIn: true }); };
  return (<div className="min-h-screen bg-slate-50 flex items-center justify-center p-6"><div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-100 shadow-xl"><div className="text-center mb-8"><Zap className="w-12 h-12 text-indigo-600 mx-auto" /><h1 className="text-2xl font-bold mt-4">LeadFlow</h1></div><form onSubmit={handleSubmit} className="space-y-4"><input type="email" placeholder="Email" className="w-full p-4 bg-slate-50 rounded-xl border" onChange={e => setEmail(e.target.value)} required /><input type="password" placeholder="Password" className="w-full p-4 bg-slate-50 rounded-xl border" onChange={e => setPass(e.target.value)} required /><button className="w-full bg-indigo-600 text-white p-4 rounded-xl font-bold">Sign In</button></form></div></div>);
};
export default Auth;
