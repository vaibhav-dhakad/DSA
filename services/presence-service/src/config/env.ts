import dotenv from 'dotenv';
dotenv.config();

export const env = {
  port: Number(process.env.PORT ?? 4003),
  redisUrl: process.env.REDIS_URL ?? 'redis://localhost:6379'
};
