const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.post('/user/:id/pins', userController.add_pin)
module.exports = router;