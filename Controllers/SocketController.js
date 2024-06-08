module.exports = (socket) => {
    console.log('New client connected');
  
    // Escucha eventos del cliente
    socket.on('message', (data) => {
      console.log('Message from client:', data);
      // Envía respuesta al cliente
      socket.emit('response', `Server received: ${data}`);
    });
  
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  };