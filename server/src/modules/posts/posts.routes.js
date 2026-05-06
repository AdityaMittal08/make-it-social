const express = require('express');
const postsController = require('./posts.controller');
const verifyJWT = require('../../middlewares/verifyJWT');

const router = express.Router();

router.use(verifyJWT);

router.route('/')
  .get(postsController.getAllPostsUser)
  .post(postsController.createPost)


router.route('/liked')
  .get(postsController.getLikedPostsUser)

router.route('/disliked')
  .get(postsController.getDislikedPostsUser)

router.route('/home')
  .get(postsController.getAllPostsFeed)
  
router.route('/:postId')
  .get(postsController.getPostById)
  .delete(postsController.deletePost);

module.exports = router;module.exports = router;
