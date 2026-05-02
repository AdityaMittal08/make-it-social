const pool = require('../../config/db');
const crypto = require('crypto');
const { comparePassword, hashPassword } = require('../../utils/hashPassword');
const { generateAccessToken, generateRefreshToken, verifyToken } = require('../../utils/generateToken');
const AppError = require('../../utils/AppError');

const hashRefreshToken = (token) =>
  crypto.createHash('sha256').update(token).digest('hex');

const getRefreshTokenExpiryDate = (refreshToken) => {
  const decoded = verifyToken(refreshToken, 'refresh');

  if (!decoded?.exp) {
    throw new AppError('Invalid refresh token payload', 401);
  }

  return new Date(decoded.exp * 1000);
};

const storeRefreshToken = async (db, { userId, refreshToken }) => {
  const tokenHash = hashRefreshToken(refreshToken);
  const expiresAt = getRefreshTokenExpiryDate(refreshToken);

  await db.query(
    `INSERT INTO refresh_tokens (user_id, token_hash, is_revoked, expires_at)
     VALUES ($1, $2, FALSE, $3)`,
    [userId, tokenHash, expiresAt]
  );
};

const registerUser = async (first_name, last_name, username, email, password) => {
  if (!username || !email || !password || !first_name || !last_name) {
    throw new AppError('All the fields are required', 400);
  }

  const userAlreadyExists = await pool.query(
    "SELECT EXISTS ( SELECT 1 FROM users WHERE username = $1 OR email = $2)", 
    [username, email]
  );

  if (userAlreadyExists.rows[0].exists) {
    throw new AppError('User already exists', 400);
  }

  const hashedPassword = await hashPassword(password);
  const result = await pool.query(
    "INSERT INTO users (first_name, last_name, username, email, hashedPassword) VALUES ($1, $2, $3, $4, $5) RETURNING user_id AS id, username, email, role_manage AS role", 
    [first_name, last_name, username, email, hashedPassword]
  );

  return result.rows[0];
};

const loginUser = async (userId, password) => {
  if (!userId || !password) {
    throw new AppError('Please enter userId and password', 400);
  }

  const userResult = await pool.query(
    "SELECT user_id AS id, username, role_manage AS role, hashedPassword FROM users WHERE username = $1 OR email = $1", 
    [userId]
  );

  if (userResult.rows.length === 0) {
    throw new AppError('Invalid userId or password', 400);
  }

  const user = userResult.rows[0];
  const isValidPassword = await comparePassword(password, user.hashedpassword);
  
  if (!isValidPassword) {
    throw new AppError('Invalid userId or password', 400);
  }

  await pool.query('DELETE FROM refresh_tokens WHERE user_id = $1 AND expires_at <= NOW()', [user.id]);

  await pool.query(`
    DELETE FROM refresh_tokens
    WHERE id IN (
      SELECT id FROM refresh_tokens
      WHERE user_id = $1
      ORDER BY created_at DESC
      OFFSET 4
    )
  `, [user.id]);

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await storeRefreshToken(pool, {
    userId: user.id,
    refreshToken,
  });

  return { accessToken, refreshToken, user: { id: user.id, username: user.username, role: user.role } };
};

const refreshUserToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new AppError('Unauthorized, no refresh token', 401);
  }

  const decoded = verifyToken(refreshToken, 'refresh');
  const tokenHash = hashRefreshToken(refreshToken);
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const tokenResult = await client.query(
      `SELECT id, user_id, is_revoked, expires_at
       FROM refresh_tokens
       WHERE token_hash = $1
       LIMIT 1`,
      [tokenHash]
    );
    
    if (tokenResult.rows.length === 0) {
      throw new AppError('Unauthorized, refresh token not recognized', 401);
    }

    const existingToken = tokenResult.rows[0];

    if (Number(existingToken.user_id) !== Number(decoded.sub)) {
      throw new AppError('Unauthorized, token subject mismatch', 401);
    }

    if (existingToken.is_revoked || new Date(existingToken.expires_at) <= new Date()) {
      if (existingToken.is_revoked) {
        await client.query('DELETE FROM refresh_tokens WHERE user_id = $1', [existingToken.user_id]);
      } else {
        await client.query('DELETE FROM refresh_tokens WHERE id = $1', [existingToken.id]);
      }
      throw new AppError('Unauthorized, refresh token is expired or revoked. All sessions terminated for security reasons.', 401);
    }

    const userResult = await client.query(
      'SELECT user_id AS id, username, role_manage AS role FROM users WHERE user_id = $1',
      [decoded.sub]
    );

    if (userResult.rows.length === 0) {
      throw new AppError('User not found', 401);
    }

    const user = userResult.rows[0];
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    // Keep the old token around but mark it as revoked for reuse detection
    await client.query('UPDATE refresh_tokens SET is_revoked = TRUE WHERE id = $1', [existingToken.id]);
    
    // Optional: Clean up any strictly expired tokens in the database to prevent unbounded growth
    await client.query('DELETE FROM refresh_tokens WHERE expires_at <= NOW()');

    await storeRefreshToken(client, {
      userId: user.id,
      refreshToken: newRefreshToken,
    });

    await client.query('COMMIT');

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  registerUser,
  loginUser,
  refreshUserToken
};