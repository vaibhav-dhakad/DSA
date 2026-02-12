import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/auth.routes.js';
import { env } from './config/env.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'auth-service' }));

app.listen(env.port, () => {
  console.log(`auth-service listening on ${env.port}`);
});
