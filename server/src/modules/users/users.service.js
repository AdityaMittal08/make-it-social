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

const fetchAllUsers = async () => {
  const query = `
    SELECT user_id, username, first_name, last_name, followers_count, followings_count
    FROM users 
    ORDER BY created_at DESC 
    LIMIT 20
  `;
  const result = await pool.query(query);
  return result.rows;
}

module.exports = {
  fetchUserDetails,
  fetchUserById,
  fetchAllUsers
}