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

  await pool.query(
    'UPDATE users SET posts_count = posts_count + 1 WHERE user_id = $1',
    [userId]
  );
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

  await pool.query(
    'UPDATE users SET posts_count = posts_count - 1 WHERE user_id = $1 AND posts_count > 0',
    [userId]
  );
};

const getPostById = async (postId, userId) => {
  const query = `
    SELECT 
      p.*, 
      u.username, 
      ur.reaction_type AS user_reaction
    FROM posts p 
    JOIN users u ON p.owner_id = u.user_id
    LEFT JOIN reactions ur ON p.post_id = ur.post_id AND ur.user_id = $2
    WHERE p.post_id = $1
  `;

  const postResult = await pool.query(query, [postId, userId]);

  if(postResult.rows.length === 0){
    throw new AppError('Post does not exist!', 404);
  }

  return postResult.rows[0];
}

const getAllPostsFeed = async (userId) => {
  const query = `
    SELECT 
      p.*, 
      u.username, 
      u.first_name, 
      u.last_name,
      ur.reaction_type AS user_reaction
    FROM posts p
    JOIN users u ON p.owner_id = u.user_id
    LEFT JOIN reactions ur ON p.post_id = ur.post_id AND ur.user_id = $1
    ORDER BY p.created_at DESC
  `;
  const postResult = await pool.query(query, [userId]);

  return postResult.rows;
}

const getAllPostsUser = async (userId) => {
  const query = `SELECT * FROM posts WHERE owner_id = $1 ORDER BY created_at DESC`;

  const postResult = await pool.query(query, [userId]);

  return postResult.rows;
}

const getInteractedPostsUser = async (userId, reactionType) => {
  const query = `
    SELECT p.*, u.username
    FROM posts p
    JOIN reactions r ON p.post_id = r.post_id
    JOIN users u ON p.owner_id = u.user_id
    WHERE r.user_id = $1 AND r.reaction_type = $2
    ORDER BY r.created_at DESC
  `;

  const result = await pool.query(query, [userId, reactionType]);
  return result.rows;
}

module.exports = {
  createPost,
  deletePost,
  getAllPostsFeed,
  getAllPostsUser,
  getInteractedPostsUser,
  getPostById
};