const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const usersController = require('../controllers/users_controller');

console.log('Router Loaded');

router.get('/', homeController.home);
router.get('/signup', homeController.signup);
router.get('/login', homeController.login);
router.get('/users', usersController.users);
router.post('/user-signup', homeController.create);
router.get('/profile', usersController.profile);
router.get('/posts', usersController.posts);

module.exports = router;