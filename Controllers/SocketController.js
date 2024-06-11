const messageProvider = require("../Repository/messageProvider");
const constants = require("../Utils/constants");
let users = [];

function handleConnection(io) {
  io.on('connection', (socket) => {

    socket.on('joinChat', (nickName) => {
      users.push({ id: socket.id, nickName });
      io.emit('userList', users);
    });

    socket.on('sendMessage', async (data) => {
      const message = {
          message: data.message,
          senderId: data.nickName
      }      
      const result = await messageProvider.create(message);
      io.emit('receiveMessage', data);

      if(result.status === constants.STATUSES.OK){
        
      }
    });

    socket.on('disconnect', () => {
      users = users.filter(user => user.id !== socket.id);
      io.emit('userList', users);
    });
  });
}

module.exports = { handleConnection };