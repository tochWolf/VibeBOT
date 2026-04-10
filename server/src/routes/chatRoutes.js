import { Router } from 'express';
import { askChat, createChat, getChats } from '../controllers/chatController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.use(protect);
router.get('/', getChats);
router.post('/', createChat);
router.post('/ask', askChat);

export default router;
