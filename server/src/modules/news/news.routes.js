const express = require('express');
const router = express.Router();
const newsController = require('./news.controller');

router.route('/latest')
 .get(newsController.getLatestNews);

module.exports = router;