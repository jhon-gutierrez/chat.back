let users = [];

function handleConnection(io) {
  io.on('connection', (socket) => {

    socket.on('joinChat', (nickName) => {
      users.push({ id: socket.id, nickName });
      io.emit('userList', users);
    });

    socket.on('sendMessage', (data) => {
      io.emit('receiveMessage', data);
    });

    socket.on('disconnect', () => {
      users = users.filter(user => user.id !== socket.id);
      io.emit('userList', users);
    });
  });
}

module.exports = { handleConnection };