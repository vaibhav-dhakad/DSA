import { Request, Response } from 'express';
import { MediaService } from '../services/media.service.js';

const service = new MediaService();

export const upload = (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }
  res.status(201).json({ url: service.buildMediaLink(req.file.filename) });
};
