const { verifyToken } = require('../utils/generateToken');
const AppError = require('../utils/AppError');

const verifyJWT = (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const decoded = verifyToken(token, 'access');

    req.user = {
      id: decoded.sub,
      username: decoded.username,
      role: decoded.role
    };

    return next();
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({ message: err.message });
    }
    return res.status(403).json({ message: 'Forbidden: Invalid token' });
  }
};

module.exports = verifyJWT;
