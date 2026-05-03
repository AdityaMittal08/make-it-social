const express = require('express');
const commentsController = require('./comments.controller');
const verifyJWT = require('../../middlewares/verifyJWT');

const router = express.Router();

router.use(verifyJWT);

router.route('/post/:postId')
  .get(commentsController.getAllCommentsPost)
  .post(commentsController.createComment)

router.route('/:commentId')
  .delete(commentsController.deleteComment);

router.route('/user')
  .get(commentsController.getAllCommentsUser);

module.exports = router;