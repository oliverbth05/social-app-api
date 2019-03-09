const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.post('/user/:id/pins', userController.add_pin);
router.delete('/user/:user_id/pins/:post_id', userController.remove_pin);
router.post('/user/:id/subscriptions', userController.add_subscription);
router.delete('/user/:subscriber_id/subscriptions/:creator_id', userController.remove_subscription);
router.get('/user/:id', userController.get_userProfile);
router.get('/user/:id/posts', userController.get_user_posts);
module.exports = router; 