const express = require('express');
const postsController = require('../controllers/posts');

const router = express.Router();

router.get('/posts', postsController.get_posts);
router.get('/post/:id', postsController.get_post);

router.post('/posts', postsController.create_post);
router.post('/post/:id/like', postsController.like_post);
module.exports = router;