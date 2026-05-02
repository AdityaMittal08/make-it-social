CREATE TABLE IF NOT EXISTS reactions (
  id SERIAL PRIMARY KEY,

  post_id INT REFERENCES posts(post_id) ON DELETE CASCADE,
  user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
  reaction_type VARCHAR(10) CHECK (reaction_type IN ('like', 'dislike')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(user_id, post_id)
);
