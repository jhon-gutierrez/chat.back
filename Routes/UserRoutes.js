const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');

router.post("/create", UserController.create);

module.exports = router;