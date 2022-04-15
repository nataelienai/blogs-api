const express = require('express');

const validateUser = require('./middlewares/validateUser');
const validateCredentials = require('./middlewares/validateCredentials');
const validateCategory = require('./middlewares/validateCategory');
const validatePost = require('./middlewares/validatePost');
const validatePostExistence = require('./middlewares/validatePostExistence');
const validatePostUpdate = require('./middlewares/validatePostUpdate');
const authorizePostAccess = require('./middlewares/authorizePostAccess');
const authenticate = require('./middlewares/authenticate');
const UserController = require('./controllers/UserController');
const LoginController = require('./controllers/LoginController');
const CategoryController = require('./controllers/CategoryController');
const PostController = require('./controllers/PostController');

const router = express.Router();

router.post('/login', validateCredentials, LoginController.login);
router.post('/user', validateUser, UserController.create);
router.get('/user', authenticate, UserController.findAll);
router.get('/user/:id', authenticate, UserController.findById);
router.post('/categories', authenticate, validateCategory, CategoryController.create);
router.get('/categories', authenticate, CategoryController.findAll);
router.post('/post', authenticate, validatePost, PostController.create);
router.get('/post', authenticate, PostController.findAll);
router.get('/post/:id', authenticate, validatePostExistence, PostController.findById);
router.put('/post/:id', authenticate, validatePostExistence, authorizePostAccess,
  validatePostUpdate, PostController.update);
router.delete('/post/:id', authenticate, validatePostExistence, authorizePostAccess,
  PostController.delete);

module.exports = router;
