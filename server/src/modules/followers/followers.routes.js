const express = require('express');
const followersController = require('./followers.controller');
const verifyJWT = require('../../middlewares/verifyJWT');

const router = express.Router();

router.use(verifyJWT);

router.route('/:username/follow')
  .post(followersController.followUser)
  .delete(followersController.unfollowUser);

router.route('/:username/follow-status')
  .get(followersController.checkFollowStatus);

router.route('/:username/followers')
  .get(followersController.getFollowers);

router.route('/:username/following')
  .get(followersController.getFollowing);

module.exports = router;