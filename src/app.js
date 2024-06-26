const express = require('express');
const app = express();
const userRoutes = require('../Routes/UserRoutes');
const messageRoutes = require('../Routes/messageRoutes');

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/message', messageRoutes);


module.exports = app;