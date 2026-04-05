const express = require('express');
const postsController = require('./posts.controller');
const verifyJWT = require('../../middlewares/verifyJWT');

const router = express.Router();

router.use(verifyJWT);

router.route('/')
  .post(postsController.createPost);

router.route('/:postId')
  .delete(postsController.deletePost);

module.exports = router;