const http = require('http');
const app = require('./app');
const socketController = require('../Controllers/SocketController');

const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
  }
});

const PORT = process.env.PORT || 5000;

socketController.handleConnection(io);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

