import cors from 'cors';
import express from 'express';
import { env } from './config/env.js';
import { groupRouter } from './routes/group.routes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/groups', groupRouter);
app.listen(env.port, () => console.log(`group-service listening on ${env.port}`));
