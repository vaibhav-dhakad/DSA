import cors from 'cors';
import express from 'express';
import { env } from './config/env.js';
import { mediaRouter } from './routes/media.routes.js';

const app = express();
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use('/api/media', mediaRouter);
app.listen(env.port, () => console.log(`media-service listening on ${env.port}`));
