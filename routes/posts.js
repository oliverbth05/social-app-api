const express = require('express');
const postsController = require('../controllers/posts');

const router = express.Router();

router.get('/posts', postsController.get_posts);
router.post('/posts', postsController.create_post);
router.get('/posts/:id', postsController.get_post);
router.patch('/posts/:id', postsController.update_post);
router.delete('/posts/:id', postsController.delete_post);
router.post('/posts/:id/likes', postsController.like_post);
router.get('/posts/:id/comments', postsController.get_comments);
router.post('/posts/:id/comments', postsController.post_comment);
router.get('/posts/:id/comments/:id', postsController.get_comment);
router.post('/posts/:id/comments/:id/likes', postsController.like_comment);
router.patch('/posts/:id/comments/:id', postsController.update_comment);
router.delete('/posts/:id/comments/:id', postsController.delete_comment);
router.post('/posts/:post_id/comments/:comment_id/replies', postsController.post_reply);

module.exports = router;
