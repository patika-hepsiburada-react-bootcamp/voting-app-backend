const Redis = require('ioredis');

const client = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  db: 0,
});

client.on('connect', () => console.log('Connected to Redis 🔫'));
client.on('ready', () => console.log('Connected to Redis and ready to use... ♥️'));
client.on('error', (err) => console.log(err.message));
client.on('end', () => console.log('Client disconnected from Redis'));

module.exports = client;
