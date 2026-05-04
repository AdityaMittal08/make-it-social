const pool = require('../../config/db');
const AppError = require('../../utils/AppError');

const fetchUserDetails = async (username) => {
  const userResult = await pool.query(
    'SELECT user_id, username, email, first_name, last_name, bio, profile_pic_url, created_at, followings_count, followers_count, posts_count FROM users where username = $1', 
    [username]
  );

  if (userResult.rows.length === 0) {
    throw new AppError('User not found', 404);
  }

  return userResult.rows[0];
}

const fetchUserById = async (userId) => {
  const userResult = await pool.query(
    'SELECT user_id, username, profile_pic_url, created_at, followings_count, posts_count FROM users WHERE user_id = $1', 
    [userId]
  );

  if (userResult.rows.length === 0) {
    throw new AppError('User not found', 404);
  }

  return userResult.rows[0];
}

module.exports = {
  fetchUserDetails,
  fetchUserById,
}