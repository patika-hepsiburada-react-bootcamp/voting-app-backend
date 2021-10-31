const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const client = require('./redis');

const Vote = require('./lib/Votes');

app.get('/', async (req, res) => {
  res.json({ message: 'App is running.' });
});

const votes = {
  javascript: 0,
  go: 0,
  php: 0,
  c: 0,
};

io.on('connection', async (socket) => {
  console.log('a user connected');

  votes.javascript = Number(await client.get('javascript'));
  votes.go = Number(await client.get('go'));
  votes.php = Number(await client.get('php'));
  votes.c = Number(await client.get('c'));

  socket.emit('new-vote', votes);

  socket.on('new-vote', (vote) => {
    Vote.incr(vote);
    console.log('New Vote:', vote);
    votes[vote] += 1;
    io.emit('new-vote', votes);
  });

  socket.on('disconnect', () => console.log('a user disconnected'));
});

server.listen(process.env.PORT || 3001, () => {
  console.log('listening on *:3001');
});
