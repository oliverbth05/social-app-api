const express = require('express');
const statsController = require('../controllers/stats');

const router = express.Router();

router.get('/stats/', statsController.get_all_stats);

module.exports =  router;