const pool = require('../../config/db');
const AppError = require('../../utils/AppError');

const createComment = async (postId, userId, content) => {
  if (!content || typeof content !== 'string') {
    throw new AppError('Post content must be a valid string', 400);
  }

  const sanitizedContent = content.trim();

  if (sanitizedContent.length === 0) {
    throw new AppError('Post content cannot be empty', 400);
  }

  if (sanitizedContent.length > 500) {
    throw new AppError('Post content exceeds the maximum limit of 500 characters', 400);
  }

  const query = `
    INSERT INTO comments (post_id, commented_by, content) 
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  
  const result = await pool.query(query, [postId, userId, sanitizedContent]);

  await pool.query(
    'UPDATE posts SET comments_count = comments_count + 1 WHERE post_id = $1',
    [postId]
  );

  return result.rows[0];
};

const deleteComment = async (commentId, userId) => {
  const commentResult = await pool.query('SELECT commented_by, post_id FROM comments WHERE comment_id = $1', [commentId]);

  if (commentResult.rows.length === 0) {
    throw new AppError('Comment does not exist!', 404);
  }

  const ownerId = commentResult.rows[0].commented_by;
  const postId = commentResult.rows[0].post_id;

  if (ownerId !== userId) {
    throw new AppError('You can only delete your own comments', 403);
  }

  await pool.query('DELETE FROM comments WHERE comment_id = $1', [commentId]);

  await pool.query(
    'UPDATE posts SET comments_count = comments_count - 1 WHERE post_id = $1 AND comments_count > 0',
    [postId]
  );
};

const getAllCommentsPost = async (postId) => {
  const query = `
    SELECT c.*, u.username
    FROM comments c
    JOIN users u ON c.commented_by = u.user_id
    WHERE c.post_id = $1
    ORDER BY c.created_at DESC
  `;
  const commentResult = await pool.query(query, [postId]);

  return commentResult.rows;
}

const getAllCommentsUser = async (userId) => {
  const query = `
    SELECT * FROM comments WHERE commented_by = $1
  `;
  const commentResult = await pool.query(query, [userId]);

  return commentResult.rows;
}

module.exports = {
  createComment,
  deleteComment,
  getAllCommentsPost,
  getAllCommentsUser,
};