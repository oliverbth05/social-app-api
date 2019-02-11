const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

router.post('/login', authController.post_login);
router.post('/register', authController.post_register);

module.exports =  router;