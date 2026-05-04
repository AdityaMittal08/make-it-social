const newsService = require('./news.service');
const asyncHandler = require('../../utils/asyncHandler');

const getLatestNews = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 5;
  const cursor = req.query.cursor || null;

  const news = await newsService.fetchPaginatedNews(limit, cursor);

  let nextCursor = null;
  
  if (news.length === limit && news.length > 0) {
    nextCursor = news[news.length - 1].published_at;
  }

  res.status(200).json({
    status: 'success',
    results: news.length,
    data: news,
    nextCursor: nextCursor 
  });
});

module.exports = {
  getLatestNews
};