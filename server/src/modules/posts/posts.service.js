const pool = require('../../config/db');
const AppError = require('../../utils/AppError');


const createPost = async (userId, content) => {
  if (!content || typeof content !== 'string') {
    throw new AppError('Post content must be a valid string', 400);
  }

  const sanitizedContent = content.trim();

  if (sanitizedContent.length === 0) {
    throw new AppError('Post content cannot be empty', 400);
  }

  if (sanitizedContent.length > 2000) {
    throw new AppError('Post content exceeds the maximum limit of 2000 characters', 400);
  }

  const query = `
    INSERT INTO posts (content, owner_id) 
    VALUES ($1, $2) 
    RETURNING post_id, content, owner_id, created_at
  `;
  
  const result = await pool.query(query, [sanitizedContent, userId]);

  return result.rows[0];
};

const deletePost = async (postId, userId) => {
  const postResult = await pool.query('SELECT owner_id FROM posts WHERE post_id = $1', [postId]);

  if (postResult.rows.length === 0) {
    throw new AppError('Post does not exist!', 404);
  }

  const ownerId = postResult.rows[0].owner_id;

  if (ownerId !== userId) {
    throw new AppError('You can only delete your own posts', 403);
  }

  await pool.query('DELETE FROM posts WHERE post_id = $1', [postId]);
};

module.exports = {
  createPost,
  deletePost
};