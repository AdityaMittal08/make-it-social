const cron = require('node-cron');
const newsService = require('./news.service');

cron.schedule('0 * * * *', async () => {
  console.log('[WORKER] Starting scheduled news sync...');
  try {
    await newsService.syncNewsFromAPI();
    await newsService.cleanupOldNews();
    console.log('[WORKER] News sync completed successfully.');
  } catch (error) {
    console.error('[WORKER] Sync failed:', error.message);
  }
});