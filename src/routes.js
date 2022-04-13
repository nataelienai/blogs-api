const express = require('express');
const validateUser = require('./middlewares/validateUser');
const UserController = require('./controllers/UserController');

const router = express.Router();

router.post('/user', validateUser, UserController.create);

module.exports = router;
