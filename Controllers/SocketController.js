const messageProvider = require("../Repository/messageProvider");
const userProvider = require("../Repository/UserProvider")
const constants = require("../Utils/constants");
let users = [];

function handleConnection(io) {
  io.on('connection', (socket) => {

    //Aqui agrega a la lista los usuarios que se conectan
    socket.on('joinChat', async (nickName) => {
      console.log("Al Socket llega el usuario: "+nickName);
      const result = await userProvider.findUserByNickName(nickName);
      users.push({ id: socket.id, nickName: result.nickName, cargo: result.cargo, correo: result.correo });
      io.emit('userList', users);
    });

    socket.on('sendMessage', async (data) => {

      const message = {
          message: data.message,
          nickName: data.nickName,
          recipientNickName: data.recipientNickName
      }      

      console.log(message);
      const result = await messageProvider.create(message);
      
      if(result.status === constants.STATUSES.OK){
        io.emit('receiveMessage', data);
      }
    });

    //Aquí actualiza la lista, filtrando a los usuarios desconectados
    socket.on('disconnect', () => {
      users = users.filter(user => user.id !== socket.id);
      io.emit('userList', users);
    });
  });
}

module.exports = { handleConnection };