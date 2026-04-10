# VIBEBot — Full-Stack AI Chatbot

VIBEBot is a production-ready full-stack AI chatbot with:
- Daily life assistant chat
- Real-time weather responses
- PDF upload + RAG chat mode
- JWT authentication
- MongoDB chat history
- Beautiful glassmorphism UI with dark mode
- Voice input, text-to-speech, and chat export

## Project Structure

```
/client   # React + Vite + Tailwind + Framer Motion
/server   # Node.js + Express + MongoDB + LangChain
```

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express
- **Auth:** JWT
- **Database:** MongoDB + Mongoose
- **AI:** OpenAI Chat Completions + LangChain embeddings
- **RAG:** PDF parsing + text splitting + vector search (MemoryVectorStore)
- **Weather:** OpenWeatherMap API

---

## 1) Setup

### Prerequisites
- Node.js 20+
- npm 10+
- MongoDB local instance or Atlas URI

### Install dependencies

```bash
npm install
```

### Configure environment files

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Then fill API keys in `server/.env`.

### Run in development

```bash
npm run dev
```

- Client: `http://localhost:5173`
- Server: `http://localhost:5000`

### Production build

```bash
npm run build
npm run start
```

---

## 2) Environment Variables

### `server/.env`

- `PORT` — backend port
- `CLIENT_URL` — frontend origin for CORS
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — JWT signing secret
- `OPENAI_API_KEY` — OpenAI API key
- `OPENAI_MODEL` — default `gpt-4o-mini`
- `OPENWEATHER_API_KEY` — OpenWeatherMap API key

### `client/.env`

- `VITE_API_URL` — backend API base URL

---

## 3) Feature Walkthrough

### Authentication
- Signup/Login with JWT
- Protected dashboard route

### Smart Chatbot Mode
- Human-friendly daily assistant
- Context memory with persisted chat history in MongoDB
- Typing indicator and loading states

### Weather Integration
- Asks like "weather in Nagpur" trigger weather API
- Response includes temperature/humidity/condition
- Dedicated weather card in chat UI

### PDF RAG Chat Mode
- Upload PDF using secure file filter + size limit
- Text extraction + splitting + embeddings
- Similarity retrieval from uploaded document
- Responses are constrained to document context in PDF mode

### Bonus
- Voice input (Web Speech API)
- Text-to-speech response playback
- Export chat as JSON
- Drag/drop-ready upload UX pattern with file input

---

## 4) API Endpoints

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/chats` (auth)
- `POST /api/chats` (auth)
- `POST /api/chats/ask` (auth)
- `POST /api/pdf/upload` (auth + multipart/form-data)
- `GET /api/weather?city=Nagpur` (auth)

---

## 5) Security & Error Handling

- JWT middleware for protected APIs
- PDF-only uploads (MIME check)
- 10MB upload limit
- Centralized API error responses
- Graceful loading and fallback states in UI

---

## 6) Notes for Scaling to Production

- Replace in-memory vector store with FAISS/Pinecone/Weaviate
- Add Redis for session/memory caching
- Add refresh tokens + rotate JWT secrets
- Add rate limiting, helmet, and structured logging
- Serve client from CDN and deploy server behind reverse proxy
