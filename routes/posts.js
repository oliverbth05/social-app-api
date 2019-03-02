const express = require('express');
const postsController = require('../controllers/posts');

const router = express.Router();

router.get('/posts', postsController.get_posts);

router.get('/post/:id', postsController.get_post);
router.patch('/post/:id', postsController.update_post);
router.delete('/post/:id', postsController.delete_post);
router.post('/posts', postsController.create_post);
router.post('/post/:id/like', postsController.like_post);
router.get('/posts/search', postsController.search_posts);

router.get('/post/:id/comments', postsController.get_comments);
router.post('/post/:id/comments', postsController.post_comment);
router.get('/comment/:id', postsController.get_comment);
router.patch('/comment/:id', postsController.update_comment);
router.delete('/comment/:id', postsController.delete_comment);


module.exports = router;