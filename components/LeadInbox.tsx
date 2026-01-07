import React from 'react';
import { LeadMessage } from '@/types';
const LeadInbox = ({ messages }: { messages: LeadMessage[] }) => (<div className="p-4 bg-white border rounded-2xl"><table><thead><tr><th>Name</th><th>Message</th></tr></thead><tbody>{messages.map(m => (<tr key={m.id}><td>{m.senderName}</td><td>{m.text}</td></tr>))}</tbody></table></div>);
export default LeadInbox;
