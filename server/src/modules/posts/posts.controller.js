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

module.exports = {
  createPost,
  deletePost
};