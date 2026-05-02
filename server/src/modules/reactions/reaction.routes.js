const express = require('express');
const reactionController = require('./reaction.controller');
const verifyJWT = require('../../middlewares/verifyJWT');

const router = express.Router({ mergeParams: true });

router.use(verifyJWT);

router.post('/posts/:postId', reactionController.toggleReaction);

module.exports = router;
