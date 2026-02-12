import { Request, Response } from 'express';
import { ChatService } from '../services/chat.service.js';

const chatService = new ChatService();

export const sendMessage = async (req: Request, res: Response) => {
  const message = await chatService.sendMessage(req.body);
  res.status(201).json(message);
};

export const updateTick = async (req: Request, res: Response) => {
  const message = await chatService.updateTick(req.params.messageId, req.body.tickStatus);
  res.status(200).json(message);
};
