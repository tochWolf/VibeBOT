import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import pdfRoutes from './routes/pdfRoutes.js';
import weatherRoutes from './routes/weatherRoutes.js';

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || '*'}));
app.use(express.json());

app.get('/api/health', (_, res) => res.json({ status: 'ok', app: 'VIBEBot API' }));
app.use('/api/auth', authRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/pdf', pdfRoutes);
app.use('/api/weather', weatherRoutes);

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: error.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
