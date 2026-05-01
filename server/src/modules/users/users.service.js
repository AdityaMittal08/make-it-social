const pool = require('../../config/db');
const AppError = require('../../utils/AppError');

const fetchUserDetails = async (userId) => {
  const userResult = await pool.query(
    'SELECT user_id, username, email, first_name, last_name, bio, profile_pic_url, created_at FROM users where user_id = $1', 
    [userId]
  );

  if (userResult.rows.length === 0) {
    throw new AppError('User not found', 404);
  }

  const followersResult = await pool.query(
    'SELECT COUNT(*) FROM follows WHERE following_id = $1', 
    [userId]
  );

  const followingResult = await pool.query(
    'SELECT COUNT(*) FROM follows WHERE follower_id = $1', 
    [userId]
  );

  const postsResult = await pool.query(
    'SELECT COUNT(*) FROM posts WHERE owner_id = $1', 
    [userId]
  );

  const user = userResult.rows[0];
  user.followersCount = parseInt(followersResult.rows[0].count, 10);
  user.followingCount = parseInt(followingResult.rows[0].count, 10);
  user.postsCount = parseInt(postsResult.rows[0].count, 10);

  return user;
}

module.exports = {
  fetchUserDetails
}