CREATE TABLE IF NOT EXISTS news_articles(
  id SERIAL PRIMARY KEY,
  article_id VARCHAR(255) UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  url TEXT,
  image_url TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);