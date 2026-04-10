import { useEffect, useState } from 'react';
import { Mic, Send, Volume2, Download } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import WeatherCard from '../components/WeatherCard';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { logout } = useAuth();
  const [input, setInput] = useState('');
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [mode, setMode] = useState('normal');
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/chats');
      setChats(data);
      if (data.length) {
        setActiveChat(data[0]._id);
        setMessages(data[0].messages || []);
      }
    })();
  }, []);

  const createChat = async () => {
    const { data } = await api.post('/chats');
    setChats([data, ...chats]);
    setActiveChat(data._id);
    setMessages([]);
  };

  const ask = async () => {
    if (!input.trim() || !activeChat) return;
    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const { data } = await api.post('/chats/ask', { chatId: activeChat, message: userMessage.content, mode });
      setMessages(data.chat.messages);
      if (data.weather) setWeather(data.weather);
      setChats((prev) => prev.map((chat) => (chat._id === data.chat._id ? data.chat : chat)));

      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(data.answer);
        speechSynthesis.cancel();
        speechSynthesis.speak(utterance);
      }
    } finally {
      setLoading(false);
    }
  };

  const uploadPdf = async (file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append('pdf', file);
    await api.post('/pdf/upload', formData);
    setMode('pdf');
  };

  const useVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.onresult = (event) => setInput((prev) => `${prev} ${event.results[0][0].transcript}`.trim());
    recognition.start();
  };

  const exportChat = () => {
    const blob = new Blob([JSON.stringify(messages, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'vibebot-chat.json';
    a.click();
  };

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4">
        <Sidebar chats={chats} onNewChat={createChat} mode={mode} setMode={setMode} onUpload={uploadPdf} dark={dark} setDark={setDark} />
        <section className="flex-1 space-y-4">
          <div className="flex justify-end gap-2">
            <button onClick={exportChat} className="glass rounded-xl p-2"><Download size={16} /></button>
            <button onClick={logout} className="glass rounded-xl px-3 py-2 text-sm">Logout</button>
          </div>
          <ChatWindow messages={messages} loading={loading} />
          <WeatherCard weather={weather} />
          <div className="glass rounded-2xl p-2 flex items-center gap-2">
            <button onClick={useVoiceInput} className="p-2 rounded-lg hover:bg-white/10"><Mic size={18} /></button>
            <input className="flex-1 bg-transparent p-2 outline-none" value={input} onChange={(e) => setInput(e.target.value)} placeholder={`Ask VIBEBot (${mode} mode)...`} onKeyDown={(e) => e.key === 'Enter' && ask()} />
            <button onClick={() => speechSynthesis.cancel()} className="p-2 rounded-lg hover:bg-white/10"><Volume2 size={18} /></button>
            <button onClick={ask} className="bg-vibe-500 rounded-lg p-2"><Send size={18} /></button>
          </div>
        </section>
      </div>
    </div>
  );
}
