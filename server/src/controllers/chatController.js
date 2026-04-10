import { Chat } from '../models/Chat.js';
import { getGeneralResponse } from '../services/openaiService.js';
import { fetchWeather } from '../services/weatherService.js';
import { queryPdfContext } from '../services/pdfService.js';

const systemPrompt = `You are VIBEBot, a warm, practical daily-life assistant. Keep responses concise and helpful.`;

const pdfSystemPrompt = `You are VIBEBot in PDF mode. Answer ONLY from provided context. If answer is not present, clearly say that the document does not contain enough information.`;

export const createChat = async (req, res) => {
  const chat = await Chat.create({ userId: req.user.id, title: 'New Chat', messages: [] });
  res.status(201).json(chat);
};

export const getChats = async (req, res) => {
  const chats = await Chat.find({ userId: req.user.id }).sort({ updatedAt: -1 });
  res.json(chats);
};

export const askChat = async (req, res) => {
  try {
    const { chatId, message, mode = 'normal' } = req.body;
    const chat = await Chat.findOne({ _id: chatId, userId: req.user.id });
    if (!chat) return res.status(404).json({ message: 'Chat not found' });

    chat.mode = mode;
    chat.messages.push({ role: 'user', content: message });

    const lowerMsg = message.toLowerCase();
    let answer;
    let weather = null;

    if (mode === 'normal' && (lowerMsg.includes('weather') || lowerMsg.includes('temperature'))) {
      const cityMatch = message.match(/in\s+([a-zA-Z\s]+)/i);
      const city = cityMatch?.[1]?.trim() || 'Nagpur';
      weather = await fetchWeather(city);
      answer = `Current weather in ${weather.city}: ${weather.temperature}°C, ${weather.description}, humidity ${weather.humidity}%.`;
    } else if (mode === 'pdf') {
      const { context, filename } = await queryPdfContext({ userId: req.user.id, question: message });
      answer = await getGeneralResponse({
        messages: [
          { role: 'system', content: pdfSystemPrompt },
          { role: 'system', content: `Filename: ${filename}\n\n${context}` },
          { role: 'user', content: message }
        ]
      });
    } else {
      const shortHistory = chat.messages.slice(-12).map((msg) => ({ role: msg.role, content: msg.content }));
      answer = await getGeneralResponse({
        messages: [{ role: 'system', content: systemPrompt }, ...shortHistory]
      });
    }

    chat.messages.push({ role: 'assistant', content: answer });
    if (chat.title === 'New Chat') chat.title = message.slice(0, 45);
    await chat.save();

    res.json({ answer, weather, chat });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
