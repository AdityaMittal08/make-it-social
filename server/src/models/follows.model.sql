CREATE TABLE IF NOT EXISTS follows (
  follower_id INT REFERENCES users(user_id) ON DELETE CASCADE,
  following_id INT REFERENCES users(user_id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (follower_id, following_id),

  CONSTRAINT cannot_follow_self CHECK (follower_id <> following_id)
);

CREATE INDEX IF NOT EXISTS idx_follows_following_id ON follows(following_id);
