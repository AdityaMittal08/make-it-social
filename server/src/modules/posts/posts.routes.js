const express = require('express');
const postsController = require('./posts.controller');
const verifyJWT = require('../../middlewares/verifyJWT');

const router = express.Router();

router.use(verifyJWT);

router.route('/')
  .get(postsController.getAllPosts)
  .post(postsController.createPost);

router.route('/:postId')
  .get(postsController.getPostById)
  .delete(postsController.deletePost);

module.exports = router;