const commentsService = require('./comments.service');
const asyncHandler = require('../../utils/asyncHandler');

const createComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const userId = req.user.id;
  const { postId } = req.params;

  const newComment = await commentsService.createComment(postId, userId, content);

  res.status(201).json({
    status: 'success',
    data: {
      post: newComment
    }
  });
});

const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user.id;

  await commentsService.deleteComment(commentId, userId);

  res.status(200).json({
    status: 'success',
    message: 'Comment deleted successfully!'
  });
});

const getAllCommentsUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const comments = await commentsService.getAllCommentsUser(userId);

  res.status(200).json({
    status: 'success',
    data: { comments }
  });
});

const getAllCommentsPost = asyncHandler(async(req, res) => {
  const { postId } = req.params;
  const comments = await commentsService.getAllCommentsPost(postId);

  res.status(200).json({
    status: 'success',
    data: { comments }
  })
})

module.exports = {
  createComment,
  deleteComment,
  getAllCommentsPost,
  getAllCommentsUser,
};