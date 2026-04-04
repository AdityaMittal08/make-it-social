const asyncHandler = require('../utils/asyncHandler')
const pool = require('../config/db.js')
const { comparePassword, hashPassword } = require('../utils/hashPassword')
const { generateAccessToken, generateRefreshToken, refreshTokenCookieOptions, verifyToken } = require('../utils/generateToken');

const register = asyncHandler(async(req, res) => {
  try {
    const {username, email, password} = req.body;
    
    // check whether user already exists or not
    if(!username){
      return res.status(400).json({error: "Enter username"})
    }
    if(!email){
      return res.status(400).json({error: "Enter email"})
    }
    if(!password){
      return res.status(400).json({error: "Enter password"})
    }

    const userAlreadyExists = await pool.query(
      "SELECT EXISTS ( SELECT 1 FROM users WHERE username = $1 OR email = $2)", [username, email]
    )

    if(userAlreadyExists.rows[0].exists){
      return res.status(400).json({error: "User already exists"})
    }

    const hashedPassword = await hashPassword(password);

    const result = await pool.query(
      "INSERT INTO users (username, email, hashedPassword) VALUES ($1, $2, $3) RETURNING *", [username, email, hashedPassword]
    )

    res.status(201).json(result.rows[0]);
  }catch(err){
    res.status(500).json({ error: "Registration failed"});
  }
});

const login = asyncHandler(async(req, res) => {
  try{
    const {userId, password} = req.body;
    
    if(!userId){
      return res.status(400).json({error: "Please enter userId"})
    }

    if(!password){
      return res.status(400).json({error: "Please enter password"})
    }

    const userResult = await pool.query(
      "SELECT id, username, role, hashedPassword FROM users WHERE username = $1 OR email = $1", [userId]
    )

    if(userResult.rows.length === 0){
      return res.status(400).json({error: "Invalid userId or password"})
    }

    const user = userResult.rows[0];
    const checkPassword = await comparePassword(password, user.hashedPassword);
    
    if(!checkPassword){
      return res.status(400).json({error: "Invalid userId or password"})
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('jwt', refreshToken, refreshTokenCookieOptions());
    res.status(200).json({accessToken})
    
  }catch(err){
    return res.status(500).json({error: "Login Failed"})
  }
});

const refresh = asyncHandler(async(req, res) => {
  const cookies = req.cookies;

  if(!cookies?.jwt){
    return res.status(401).json({message: "Unauthorized"})
  }

  const refreshToken = cookies.jwt;

  try{
    const decoded = verifyToken(refreshToken, 'refresh');

    const userResult = await pool.query(
      "SELECT id, username, role FROM users WHERE id = $1", [decoded.sub]
    );

    if(userResult.rows.length === 0){
      return res.status(401).json({message: "User not found"})
    }

    const user = userResult.rows[0];

    const accessToken = generateAccessToken(user);

    res.json({accessToken});
  }catch(err){
    return res.status(403).json({ message: "Forbidden"})
  }
});

module.exports = {
  register,
  login,
  refresh
};