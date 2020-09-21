const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const usersController = require('../controllers/users_controller');

console.log('Router Loaded');

router.get('/', homeController.home);
router.get('/signup', homeController.signup);
router.get('/login', homeController.login);
router.post('/user-signup', homeController.create);
router.post('/user-login', homeController.createSession);
router.post('/user-logout', usersController.endSession);
router.get('/users', usersController.users);
router.get('/profile', usersController.profile);
router.get('/posts', usersController.posts);

module.exports = router;