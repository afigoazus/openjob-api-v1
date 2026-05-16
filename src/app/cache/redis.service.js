import { createClient } from "redis";

const CACHE_TTL = 3600;

class CacheService {
  constructor() {
    this.client = createClient({
      socket: {
        host: process.env.REDIS_HOST || "localhost",
        port: process.env.REDIS_PORT || 6379,
      },
    });

    this.client.on("error", (error) => {
      console.error(error);
    });

    this.client.connect();
  }

  async get(key) {
    const data = await this.client.get(key);
    return data ? JSON.parse(data) : null;
  }

  async set(key, value) {
    await this.client.setEx(key, CACHE_TTL, JSON.stringify(value));
  }

  async del(key) {
    await this.client.del(key);
  }
}

export default new CacheService();
