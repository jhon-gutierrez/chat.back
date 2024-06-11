const http = require('http');
const socketController = require('../Controllers/SocketController')
const app = require('./app');

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

const io = require('socket.io')(server, {
  cors: {
    origin: "*",
  }
});

socketController.handleConnection(io);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

