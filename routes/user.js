const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.post('/user/:userId/pins', userController.addPin);
router.delete('/user/:userId/pins/:postId', userController.removePin);

router.post('/user/:subscriberId/subscriptions/creatorId', userController.addSubscription);
router.delete('/user/:subscriberId/subscriptions/:creatorId', userController.removeSubscription);

router.get('/user/:userId/notifications', userController.getNotifications);
router.patch('/user/:userId/notifications/:notificationId', userController.updateNotification);

router.get('/user/:userId', userController.getUserProfile);
router.get('/user/:userId/posts', userController.getUserPosts);

module.exports = router;  