const jwt = require('jsonwebtoken');
const AppError = require('./AppError');

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const ACCESS_TOKEN_EXPIRY  = process.env.ACCESS_TOKEN_EXPIRY  || '15m';
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY || '7d';
const ACCESS_TOKEN_COOKIE_MAX_AGE_MS = Number(process.env.ACCESS_TOKEN_COOKIE_MAX_AGE_MS) || 15 * 60 * 1000;

if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
  throw new Error(
    'Missing JWT secrets. Set ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET in .env'
  );
}

const buildPayload = (user) => ({
  sub:      user.id,
  username: user.username,
  role:     user.role,
});

const generateAccessToken = (user) => {
  const payload = buildPayload(user);

  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
    issuer: 'makeitsocial',
    audience: 'makeitsocial-client',
  })
}

const generateRefreshToken = (user) => {
  const payload = buildPayload(user);
 
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
    issuer:    'makeitsocial',
    audience:  'makeitsocial-client',
  });
};


const verifyToken = (token, type = 'access') => {
  const secret = type === 'refresh' ? REFRESH_TOKEN_SECRET : ACCESS_TOKEN_SECRET;

  try{
    const decoded = jwt.verify(token, secret, {
      issuer: 'makeitsocial',
      audience: 'makeitsocial-client',
    });

    return decoded;
  }catch(err){
    if(err.name === 'TokenExpiredError'){
      throw new AppError('Token has expired. Please log in again.', 401);
    }

    if(err.name === 'JsonWebTokenError'){
      throw new AppError('Invalid token. Please login again', 401);
    }

const accessTokenCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 15*60*1000,
});

    throw new AppError('Token verification failed.', 401);
  }
};

const refreshTokenCookieOptions = () => ({
  accessTokenCookieOptions,
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7*24*60*60*1000,
});

const accessTokenCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: ACCESS_TOKEN_COOKIE_MAX_AGE_MS,
});


module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  refreshTokenCookieOptions,
  accessTokenCookieOptions,
};