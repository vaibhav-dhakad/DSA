import { Router } from 'express';
import multer from 'multer';
import { upload } from '../controllers/media.controller.js';

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (_req, file, callback) => callback(null, `${Date.now()}-${file.originalname}`)
});
const uploader = multer({ storage });

export const mediaRouter = Router();
mediaRouter.post('/upload', uploader.single('file'), upload);
