const Redis = require('ioredis');

const client = new Redis({
  host: 'redis-10030.c1.eu-west-1-3.ec2.cloud.redislabs.com',
  port: '10030',
  password: 'wSm94MwAc7KAzwYtzNY1M0s7Y2TnXerd',
  db: 0,
});

client.on('connect', () => console.log('Connected to Redis 🔫'));
client.on('ready', () => console.log('Connected to Redis and ready to use... ♥️'));
client.on('error', (err) => console.log(err.message));
client.on('end', () => console.log('Client disconnected from Redis'));

module.exports = client;
