const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('Router Loaded');

router.get('/', homeController.home);
router.get('/signup', homeController.signup);
router.get('/login', homeController.login);
router.use('/users', require('./users'));
router.post('/user-signup', homeController.create);

module.exports = router;