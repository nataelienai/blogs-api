const express = require('express');

const validateUser = require('./middlewares/validateUser');
const validateCredentials = require('./middlewares/validateCredentials');
const UserController = require('./controllers/UserController');
const LoginController = require('./controllers/LoginController');

const router = express.Router();

router.post('/user', validateUser, UserController.create);
router.post('/login', validateCredentials, LoginController.login);

module.exports = router;
