const fs = require('fs');
const path = require('path');
const pool = require('../config/db');

const modelsDir = path.join(__dirname, '../models');

async function initializeDatabase() {
  try {
    console.log('Starting database initialization...');

    const files = fs.readdirSync(modelsDir).filter(file => file.endsWith('.sql'));

    const executionOrder = [
      'users.model.sql',
      'refresh_tokens.model.sql',
      'posts.model.sql',
      'follows.model.sql',
      'comment.model.sql',
      'reactions.model.sql'
    ];

    files.sort((a, b) => {
      let indexA = executionOrder.indexOf(a);
      let indexB = executionOrder.indexOf(b);
      if (indexA === -1) indexA = 999;
      if (indexB === -1) indexB = 999;
      return indexA - indexB;
    });

    for (const file of files) {
      const filePath = path.join(modelsDir, file);
      const sqlQuery = fs.readFileSync(filePath, 'utf8');
      
      console.log(`Executing ${file}...`);
      await pool.query(sqlQuery);
      console.log(`-> ${file} executed successfully.`);
    }

    console.log(':) Database initialization complete!');
  } catch (error) {
    console.error(':( Error initializing database:', error);
  } finally {
    pool.end();
  }
}

initializeDatabase();
