const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');

router.post("/login", UserController.login);  
router.post("/user", UserController.create);

module.exports = router;