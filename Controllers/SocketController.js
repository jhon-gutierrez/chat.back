module.exports = (socket) => {
  
    socket.on('message', (data) => {
      socket.emit('response', `Server received: ${data}`);
    });
  
    socket.on('disconnect', () => {
    });
  };