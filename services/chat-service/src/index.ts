import cors from 'cors';
import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import { env } from './config/env.js';
import { chatRouter } from './routes/chat.routes.js';
import { connectProducer } from './events/kafka.producer.js';
import { ChatService } from './services/chat.service.js';

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
const chatService = new ChatService();

app.use(cors());
app.use(express.json());
app.use('/api/chat', chatRouter);

io.on('connection', (socket) => {
  socket.on('message:delivered', async ({ messageId }) => {
    await chatService.updateTick(messageId, 'DELIVERED');
  });
  socket.on('message:read', async ({ messageId }) => {
    await chatService.updateTick(messageId, 'READ');
  });
});

const bootstrap = async () => {
  await mongoose.connect(env.mongoUrl);
  await connectProducer();
  server.listen(env.port, () => console.log(`chat-service listening on ${env.port}`));
};

bootstrap();
