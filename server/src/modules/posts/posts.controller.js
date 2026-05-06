const postsService = require('./posts.service');
const asyncHandler = require('../../utils/asyncHandler');

const createPost = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const userId = req.user.id;

  const newPost = await postsService.createPost(userId, content);

  res.status(201).json({
    status: 'success',
    data: {
      post: newPost
    }
  });
});

const deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;

  await postsService.deletePost(postId, userId);

  res.status(200).json({
    status: 'success',
    message: 'Post deleted successfully!'
  });
});

const getPostById = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;
  
  const post = await postsService.getPostById(postId, userId);

  res.status(200).json({
    status: 'success',
    data: { post }
  });
});

const getAllPostsUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const posts = await postsService.getAllPostsUser(userId);

  res.status(200).json({
    status: 'success',
    data: { posts }
  });
});

const getLikedPostsUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const posts = await postsService.getInteractedPostsUser(userId, 'like');

  res.status(200).json({
    status: 'success',
    data: { posts }
  });
});

const getDislikedPostsUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const posts = await postsService.getInteractedPostsUser(userId, 'dislike');

  res.status(200).json({
    status: 'success',
    data: { posts }
  });
});

const getAllPostsFeed = asyncHandler(async(req, res) => {
  const userId = req.user.id;
  const posts = await postsService.getAllPostsFeed(userId);

  res.status(200).json({
    status: 'success',
    data: { posts }
  })
})


module.exports = {
  createPost,
  deletePost,
  getPostById,
  getAllPostsUser,
  getLikedPostsUser,
  getDislikedPostsUser,
  getAllPostsFeed
};