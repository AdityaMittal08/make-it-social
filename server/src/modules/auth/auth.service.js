const pool = require('../../config/db');
const { comparePassword, hashPassword } = require('../../utils/hashPassword');
const { generateAccessToken, generateRefreshToken, verifyToken } = require('../../utils/generateToken');
const AppError = require('../../utils/AppError');

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

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return { accessToken, refreshToken, user: { id: user.id, username: user.username, role: user.role } };
};

const refreshUserToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new AppError('Unauthorized, no refresh token', 401);
  }

  const decoded = verifyToken(refreshToken, 'refresh');

  const userResult = await pool.query(
    "SELECT user_id AS id, username, role_manage AS role FROM users WHERE user_id = $1", 
    [decoded.sub]
  );

  if (userResult.rows.length === 0) {
    throw new AppError('User not found', 401);
  }

  const user = userResult.rows[0];
  const newAccessToken = generateAccessToken(user);

  return { accessToken: newAccessToken };
};

module.exports = {
  registerUser,
  loginUser,
  refreshUserToken
};