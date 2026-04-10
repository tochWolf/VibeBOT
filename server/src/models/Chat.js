import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ['user', 'assistant', 'system'], required: true },
    content: { type: String, required: true }
  },
  { _id: false, timestamps: true }
);

const chatSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, default: 'New Chat' },
    mode: { type: String, enum: ['normal', 'pdf'], default: 'normal' },
    messages: { type: [messageSchema], default: [] }
  },
  { timestamps: true }
);

export const Chat = mongoose.model('Chat', chatSchema);
