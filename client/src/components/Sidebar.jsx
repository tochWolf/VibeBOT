import { FileUp, MessageSquarePlus, Moon, Sun } from 'lucide-react';

import { useState } from 'react';

export default function Sidebar({ chats, onNewChat, mode, setMode, onUpload, dark, setDark }) {
  const [dragOver, setDragOver] = useState(false);

  return (
    <aside className="w-full md:w-80 glass rounded-2xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-xl">VIBEBot</h2>
        <button onClick={() => setDark(!dark)}>{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
      </div>
      <button onClick={onNewChat} className="w-full p-3 rounded-xl bg-vibe-500 flex gap-2 justify-center"><MessageSquarePlus size={18} /> New chat</button>
      <label
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); onUpload(e.dataTransfer.files?.[0]); }}
        className={`w-full p-3 rounded-xl border border-dashed flex gap-2 justify-center cursor-pointer transition ${dragOver ? 'border-violet-300 bg-violet-500/10' : 'border-white/40'}`}
      >
        <FileUp size={18} /> {dragOver ? 'Drop PDF here' : 'Upload PDF'}
        <input type="file" accept="application/pdf" onChange={(e) => onUpload(e.target.files?.[0])} className="hidden" />
      </label>
      <div className="flex bg-white/10 rounded-xl p-1">
        {['normal', 'pdf'].map((option) => (
          <button key={option} onClick={() => setMode(option)} className={`flex-1 p-2 rounded-lg capitalize ${mode === option ? 'bg-vibe-500' : ''}`}>{option}</button>
        ))}
      </div>
      <div>
        <p className="text-xs uppercase text-slate-400 mb-2">History</p>
        <div className="space-y-2 max-h-[400px] overflow-auto pr-1">
          {chats.map((chat) => <div key={chat._id} className="bg-white/5 rounded-lg p-2 text-sm truncate">{chat.title}</div>)}
        </div>
      </div>
    </aside>
  );
}
