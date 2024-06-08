module.exports = (socket) => {
  
    socket.on('message', (data) => {
      console.log(data)
      socket.emit('response', `Server received: ${data}`);
    });
  
    socket.on('disconnect', () => {
    });
  };