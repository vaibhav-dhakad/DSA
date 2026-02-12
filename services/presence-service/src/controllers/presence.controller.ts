import { Request, Response } from 'express';
import { PresenceService } from '../services/presence.service.js';

const service = new PresenceService();

export const setOnline = async (req: Request, res: Response) => {
  await service.setOnline(req.params.userId);
  res.status(204).send();
};

export const setOffline = async (req: Request, res: Response) => {
  await service.setOffline(req.params.userId);
  res.status(204).send();
};

export const getStatus = async (req: Request, res: Response) => {
  const status = await service.getStatus(req.params.userId);
  res.status(200).json(status);
};
