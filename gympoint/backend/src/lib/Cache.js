import Redis from 'ioredis';

class Cache {
  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      keyPrefix: 'gympointcache:',
    });
  }

  // Lista expira em 25hrs
  set(key, value) {
    return this.redis.set(key, JSON.stringify(value), 'EX', 60 * 60 * 24);
  }

  async get(key) {
    const cached = await this.redis.get(key);

    return cached ? JSON.parse(cached) : null;
  }

  invalidate(key) {
    return this.redis.del(key);
  }

  async invalidatePrefix(prefix) {
    const keys = await this.redis.keys(`gympointcache:${prefix}:*`);

    const keysWithoutPrefix = keys.map(key =>
      key.replace('gympointcache:', '')
    );

    return keysWithoutPrefix && keysWithoutPrefix.length
      ? this.redis.del(keysWithoutPrefix)
      : false;
  }
}

export default new Cache();
