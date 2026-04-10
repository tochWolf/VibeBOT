import { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';

export default function ChatWindow({ messages, loading }) {
  const endRef = useRef(null);
  useMemo(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages, loading]);

  return (
    <div className="glass rounded-2xl flex-1 p-4 overflow-auto max-h-[70vh]">
      <div className="space-y-3">
        {messages.map((msg, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className={`max-w-[85%] rounded-2xl px-4 py-3 ${msg.role === 'user' ? 'ml-auto bg-vibe-500' : 'bg-white/10'}`}>
            {msg.content}
          </motion.div>
        ))}
        {loading && <div className="bg-white/10 inline-flex items-center gap-1 rounded-2xl px-4 py-3"><span className="animate-bounce">•</span><span className="animate-bounce [animation-delay:.2s]">•</span><span className="animate-bounce [animation-delay:.4s]">•</span></div>}
        <div ref={endRef} />
      </div>
    </div>
  );
}
