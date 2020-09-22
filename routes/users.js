const express = require('express');
const router = express.Router();
const passport = require('passport');


const usersController = require('../controllers/users_controller');

router.get('/profile', usersController.profile);

router.get('/signup', usersController.signup);
router.get('/login', usersController.login);

router.get('/users', usersController.users);
router.get('/posts', usersController.posts);

router.post('/user-signup', usersController.create);

// Use passport as a middleware to authenticate
router.post('/user-login', passport.authenticate(
    'local',
    {failureRedirect: '/login'},
), usersController.createSession);

module.exports = router;