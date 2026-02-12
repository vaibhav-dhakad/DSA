import cors from 'cors';
import express from 'express';
import { env } from './config/env.js';
import { presenceRouter } from './routes/presence.routes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/presence', presenceRouter);
app.listen(env.port, () => console.log(`presence-service listening on ${env.port}`));
