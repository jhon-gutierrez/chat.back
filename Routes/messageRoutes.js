const express = require('express');
const router = express.Router();
const messageController = require('../Controllers/messageController');

// Ruta para crear un nuevo mensaje
router.post('/create', messageController.create);

module.exports = router;