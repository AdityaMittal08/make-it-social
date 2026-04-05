const { verifyToken } = require('../utils/generateToken');
const AppError = require('../utils/AppError');

const verifyJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    const decoded = verifyToken(token, 'access');

    req.user = {
      id: decoded.sub,
      username: decoded.username,
      role: decoded.role
    };

    next();
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({ message: err.message });
    }
    return res.status(403).json({ message: 'Forbidden: Invalid token' });
  }
};

module.exports = verifyJWT;