const redis = require('redis');
const {promisify} = require('util');

const client = redis.createClient();
client.set = promisify(client.set);
client.get = promisify(client.get);
client.flushdb = promisify(client.flushdb);

module.exports = {
  async get(key) {
    return await client.get(key);
  },

  async set(key, value) {
    await client.set(key, value);
  },

  async remember(key, callback) {
    const reply = await client.get(key);

    if (reply) {
      return JSON.parse(reply);
    }

    try {
      let value = await callback();
      await this.set(key, JSON.stringify(value));
      return value;
    } catch (e) {

    }
  },

  async flush() {
    await client.flushdb();
  },
};