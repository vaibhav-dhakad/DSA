import { Router } from 'express';
import { sendMessage, updateTick } from '../controllers/chat.controller.js';

export const chatRouter = Router();
chatRouter.post('/messages', sendMessage);
chatRouter.patch('/messages/:messageId/tick', updateTick);
