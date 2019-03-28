const express = require('express');
const postsController = require('../controllers/posts');

const router = express.Router();

router.get('/posts', postsController.getPosts);
router.post('/posts', postsController.createPost);
router.get('/posts/:id', postsController.getPost);
router.patch('/posts/:postId', postsController.updatePost);
router.delete('/posts/:id', postsController.deletePost);
router.post('/posts/:postId/likes', postsController.likePost);

router.get('/posts/:postId/comments', postsController.getComments);
router.post('/posts/:postId/comments', postsController.postComment);
router.get('/posts/:postId/comments/:commentId', postsController.getComment);
router.post('/posts/:postId/comments/:commentId/likes', postsController.likeComment);
router.patch('/posts/:postId/comments/:commentId', postsController.updateComment);
router.delete('/posts/:postId/comments/:commentId', postsController.deleteComment);


module.exports = router;
