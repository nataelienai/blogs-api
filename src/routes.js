const express = require('express');

const validateUser = require('./middlewares/validateUser');
const validateCredentials = require('./middlewares/validateCredentials');
const validateCategory = require('./middlewares/validateCategory');
const authenticate = require('./middlewares/authenticate');
const UserController = require('./controllers/UserController');
const LoginController = require('./controllers/LoginController');
const CategoryController = require('./controllers/CategoryController');

const router = express.Router();

router.post('/login', validateCredentials, LoginController.login);
router.post('/user', validateUser, UserController.create);
router.get('/user', authenticate, UserController.findAll);
router.get('/user/:id', authenticate, UserController.findById);
router.post('/categories', authenticate, validateCategory, CategoryController.create);
router.get('/categories', authenticate, CategoryController.findAll);

module.exports = router;
