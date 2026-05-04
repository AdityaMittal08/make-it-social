const pool = require("../../config/db");
const axios = require("axios");
const format = require("pg-format");

const fetchPaginatedNews = async (limit = 5, cursor = null) => {
  let query;
  let queryParams;

  if (cursor) {
    query = `
      SELECT * FROM news_articles 
      WHERE published_at < $1 
      ORDER BY published_at DESC 
      LIMIT $2
    `;
    queryParams = [cursor, limit];
  } else {
    query = `
      SELECT * FROM news_articles 
      ORDER BY published_at DESC 
      LIMIT $1
    `;
    queryParams = [limit];
  }

  const result = await pool.query(query, queryParams);
  return result.rows;
};

const syncNewsFromAPI = async () => {
  const CURRENTS_API_URL = 'https://api.currentsapi.services/v1/latest-news';

  console.log("Worker: Fetching fresh news from Currents API...");

  const apiResponse = await axios.get(CURRENTS_API_URL, {
    params: { page_size: 30 },
    headers: { Authorization: process.env.CURRENTS_API_KEY },
  });

  const articles = apiResponse.data.news;

  const formattedValues = articles.map(a => [
    a.id || null, 
    a.title || 'No Title', 
    a.description || '', 
    a.url || '', 
    a.image || null, 
    a.published || new Date().toISOString()
  ]);

  const newsInsertQuery = format(
    `INSERT INTO news_articles (article_id, title, description, url, image_url, published_at)
     VALUES %L
     ON CONFLICT (article_id) DO NOTHING`,
    formattedValues
  );

  await pool.query(newsInsertQuery);
  console.log(`Worker: Successfully synced articles to database.`);
};

module.exports = {
  fetchPaginatedNews,
  syncNewsFromAPI,
};