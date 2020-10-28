const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('Router Loaded');

router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/api', require('./api'));
router.use('/comments', require('./comments'));
router.get('/', homeController.home);


module.exports = router;