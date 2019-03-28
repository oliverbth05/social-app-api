const express = require('express');
const postsController = require('../controllers/posts');

const router = express.Router();

router.get('/posts', postsController.get_posts);
router.post('/posts', postsController.create_post);
router.get('/posts/:id', postsController.get_post);
router.patch('/posts/:id', postsController.update_post);
router.delete('/posts/:id', postsController.delete_post);
router.post('/posts/:id/likes', postsController.like_post);

router.get('/posts/:postId/comments', postsController.getComments);
router.post('/posts/:postId/comments', postsController.postComment);
router.get('/posts/:postId/comments/:commentId', postsController.get_comment);
router.post('/posts/:postId/comments/:commentId/likes', postsController.like_comment);
router.patch('/posts/:postId/comments/:commentId', postsController.update_comment);
router.delete('/posts/:postId/comments/:commentId', postsController.delete_comment);


module.exports = router;
 