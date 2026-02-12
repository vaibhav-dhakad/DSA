import { redis } from '../models/redis.js';

export class PresenceService {
  async setOnline(userId: string) {
    await redis.hset(`presence:${userId}`, { online: 'true', lastSeen: new Date().toISOString() });
  }

  async setOffline(userId: string) {
    await redis.hset(`presence:${userId}`, { online: 'false', lastSeen: new Date().toISOString() });
  }

  async getStatus(userId: string) {
    return redis.hgetall(`presence:${userId}`);
  }
}
