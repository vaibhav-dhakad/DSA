import dotenv from 'dotenv';
dotenv.config();

export const env = {
  port: Number(process.env.PORT ?? 4005),
  mediaBaseUrl: process.env.MEDIA_BASE_URL ?? 'http://localhost:4005/uploads'
};
