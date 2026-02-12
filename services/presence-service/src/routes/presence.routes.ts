import { Router } from 'express';
import { getStatus, setOffline, setOnline } from '../controllers/presence.controller.js';

export const presenceRouter = Router();
presenceRouter.post('/:userId/online', setOnline);
presenceRouter.post('/:userId/offline', setOffline);
presenceRouter.get('/:userId', getStatus);
