
var express = require('express');
var router = express.Router();

const UserController = require('../Controllers/UserController');

router.post("/create", UserController.create);

module.exports = router;