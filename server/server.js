const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const pool = require('./src/config/db');
require('dotenv').config();

const authRoutes = require('./src/modules/auth/auth.routes');
const postsRoutes = require('./src/modules/posts/posts.routes');
const usersRoutes = require('./src/modules/users/users.routes');
const reactionRoutes = require('./src/modules/reactions/reaction.routes');
const verifyJWT = require('./src/middlewares/verifyJWT');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/reactions', reactionRoutes);

app.get('/api/users', verifyJWT, async (req, res) => {
  try {
    const result = await pool.query('SELECT user_id, username, email, first_name, last_name FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

