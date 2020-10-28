const express = require('express');
const router = express.Router();

const postsListV2 = require('../../../controllers/api/v2/posts_api_v2');


router.get('/', postsListV2.index);





module.exports = router;