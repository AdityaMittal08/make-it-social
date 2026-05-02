const reactionService = require('./reaction.service');
const asyncHandler = require('../../utils/asyncHandler');
const AppError = require('../../utils/AppError');

const toggleReaction = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { reactionType } = req.body;
  const userId = req.user.id;

  if (!['like', 'dislike'].includes(reactionType?.toLowerCase())) {
    throw new AppError('Invalid reaction type', 400);
  }

  const result = await reactionService.toggleReaction(postId, userId, reactionType);
  res.status(200).json({ status: 'success', ...result });
});

module.exports = {
  toggleReaction,
};
