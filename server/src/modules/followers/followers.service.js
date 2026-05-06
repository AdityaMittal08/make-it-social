const pool = require('../../config/db');
const AppError = require('../../utils/AppError');

const followUser = async (followerId, followingUsername) => {
  const userRes = await pool.query('SELECT user_id FROM users WHERE username = $1', [followingUsername]);
  if (userRes.rows.length === 0) throw new AppError('User not found', 404);
  
  const followingId = userRes.rows[0].user_id;

  if (followerId === followingId) throw new AppError('Cannot follow yourself', 400);

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const insertRes = await client.query(
      'INSERT INTO follows (follower_id, following_id) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING *', 
      [followerId, followingId]
    );

    if (insertRes.rows.length > 0) {
      await client.query('UPDATE users SET followings_count = followings_count + 1 WHERE user_id = $1', [followerId]);
      await client.query('UPDATE users SET followers_count = followers_count + 1 WHERE user_id = $1', [followingId]);
    }

    await client.query('COMMIT');
    return { message: 'Followed successfully', following_id: followingId };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

const unfollowUser = async (followerId, followingUsername) => {
  const userRes = await pool.query('SELECT user_id FROM users WHERE username = $1', [followingUsername]);
  if (userRes.rows.length === 0) throw new AppError('User not found', 404);
  
  const followingId = userRes.rows[0].user_id;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const result = await client.query(
      'DELETE FROM follows WHERE follower_id = $1 AND following_id = $2 RETURNING *', 
      [followerId, followingId]
    );
    
    if (result.rows.length > 0) {
      await client.query('UPDATE users SET followings_count = GREATEST(followings_count - 1, 0) WHERE user_id = $1', [followerId]);
      await client.query('UPDATE users SET followers_count = GREATEST(followers_count - 1, 0) WHERE user_id = $1', [followingId]);
    }

    await client.query('COMMIT');
    return { message: 'Unfollowed successfully', following_id: followingId };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

const checkFollowStatus = async (followerId, followingUsername) => {
  const userRes = await pool.query('SELECT user_id FROM users WHERE username = $1', [followingUsername]);
  if (userRes.rows.length === 0) throw new AppError('User not found', 404);
  
  const followingId = userRes.rows[0].user_id;

  const checkRes = await pool.query(
    'SELECT * FROM follows WHERE follower_id = $1 AND following_id = $2', 
    [followerId, followingId]
  );
  
  return { isFollowing: checkRes.rows.length > 0 };
};

const getFollowers = async (username) => {
  const query = `
    SELECT u.username, u.first_name, u.last_name, u.profile_pic_url, u.bio
    FROM follows f
    JOIN users u ON f.follower_id = u.user_id
    JOIN users target ON f.following_id = target.user_id
    WHERE target.username = $1
    ORDER BY f.created_at DESC
  `;
  const result = await pool.query(query, [username]);
  return result.rows;
};

const getFollowing = async (username) => {
  const query = `
    SELECT u.username, u.first_name, u.last_name, u.profile_pic_url, u.bio
    FROM follows f
    JOIN users u ON f.following_id = u.user_id
    JOIN users target ON f.follower_id = target.user_id
    WHERE target.username = $1
    ORDER BY f.created_at DESC
  `;
  const result = await pool.query(query, [username]);
  return result.rows;
};

module.exports = {
  followUser,
  unfollowUser,
  checkFollowStatus,
  getFollowers,
  getFollowing
};