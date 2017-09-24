import redis from 'redis';
import { promisify } from 'util';

const client = redis.createClient();
client.set = promisify(client.set);
client.get = promisify(client.get);
client.flushdb = promisify(client.flushdb);

const cache = {
  async get(key) {
    return client.get(key);
  },

  async set(key, value) {
    if (process.env.NODE_ENV === 'production') {
      await client.set(key, value);
    }
  },

  async remember(key, callback) {
    const reply = await client.get(key);

    if (reply) {
      return JSON.parse(reply);
    }

    const value = await callback();
    await this.set(key, JSON.stringify(value));
    return value;
  },

  async flush() {
    await client.flushdb();
  },
};

export default cache;
