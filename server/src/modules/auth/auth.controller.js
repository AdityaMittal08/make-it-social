const asyncHandler = require('../../utils/asyncHandler');
const { registerUser, loginUser, refreshUserToken } = require('./auth.service');
const { refreshTokenCookieOptions, accessTokenCookieOptions } = require('../../utils/generateToken');
const REFRESH_COOKIE_NAME = 'refreshToken';

const register = asyncHandler(async (req, res) => {
  const {first_name, last_name, username, email, password } = req.body;
  
  const newUser = await registerUser(first_name, last_name, username, email, password);

  res.status(201).json({
    status: 'success',
    data: { user: newUser }
  });
});

const login = asyncHandler(async (req, res) => {
  const { userId, password } = req.body;
  
  const { accessToken, refreshToken, user } = await loginUser(userId, password);

  res.cookie(REFRESH_COOKIE_NAME, refreshToken, refreshTokenCookieOptions());
  res.cookie('accessToken', accessToken, accessTokenCookieOptions());

  res.status(200).json({
    status: 'success',
    data: { user }
  });
});

const refresh = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  
  if (!cookies?.[REFRESH_COOKIE_NAME]) {
    return res.status(401).json({ status: 'fail', message: 'Unauthorized' });
  }

  const { accessToken, refreshToken } = await refreshUserToken(cookies[REFRESH_COOKIE_NAME]);

  res.cookie(REFRESH_COOKIE_NAME, refreshToken, refreshTokenCookieOptions());
  res.cookie('accessToken', accessToken, accessTokenCookieOptions());

  res.status(200).json({
    status: 'success'
  });
});

const me = asyncHandler(async (req, res) => {
  res.status(200).json({
    status: 'success',
    data: { user: req.user }
  });
});

module.exports = {
  register,
  login,
  refresh,
  me
};