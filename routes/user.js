const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.post('/user/:id/pins', userController.add_pin);
router.delete('/user/:user_id/pins/:post_id', userController.remove_pin);
router.get('/user/:id', userController.get_userProfile);
module.exports = router;