const followersService = require('./followers.service');
const asyncHandler = require('../../utils/asyncHandler');

const followUser = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const followerId = req.user.id;

  const result = await followersService.followUser(followerId, username);

  res.status(200).json({
    status: 'success',
    data: result
  });
});

const unfollowUser = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const followerId = req.user.id;

  const result = await followersService.unfollowUser(followerId, username);

  res.status(200).json({
    status: 'success',
    data: result
  });
});

const checkFollowStatus = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const followerId = req.user.id;

  const result = await followersService.checkFollowStatus(followerId, username);

  res.status(200).json({
    status: 'success',
    data: result
  });
});

const getFollowers = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const followers = await followersService.getFollowers(username);

  res.status(200).json({
    status: 'success',
    data: { followers }
  });
});

const getFollowing = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const following = await followersService.getFollowing(username);

  res.status(200).json({
    status: 'success',
    data: { following }
  });
});

module.exports = {
  followUser,
  unfollowUser,
  checkFollowStatus,
  getFollowers,
  getFollowing
};