const express = require('express');
const socket = require('socket.io');
const http = require('http');

//const PORT = process.env.PORT || 3000;
const app = express();
const httpServer = http.createServer(app);
const io = socket(httpServer, {
  path: '/socket.io'
});

app.use(express.static(__dirname + '/../public'));

const UsersOnline = [];

io.on('connection', (socket) => {

  socket.on('join', (username) => {
    socket.data = {
      id: socket.id,
      username,
    }

    UsersOnline.push(socket.data.username);

    console.log(`User ${socket.data.username} joined the chat using socket ${socket.data.id}`);

    io.emit('UsersOnline', UsersOnline);
  })

  socket.on('disconnect', () => {
    UsersOnline.splice(UsersOnline.indexOf(socket.data.username), 1);
    console.log(`User ${socket.data.username} disconnected`);

    io.emit('ExitUser', (UsersOnline));
  })

  let messages = [];

  socket.on("sendMessage", (data) => {
    messages.push(data);
    socket.broadcast.emit("receivedMessage", data);
  });
});

/* httpServer.listen(PORT, () => {
  console.log(`Server online at http://localhost:${PORT}`);
}) */
