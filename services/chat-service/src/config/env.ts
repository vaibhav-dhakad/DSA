import dotenv from 'dotenv';
dotenv.config();

export const env = {
  port: Number(process.env.PORT ?? 4002),
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://localhost:27017/chat',
  kafkaBrokers: (process.env.KAFKA_BROKERS ?? 'localhost:9092').split(','),
  kafkaTopic: process.env.KAFKA_TOPIC ?? 'chat-messages'
};
