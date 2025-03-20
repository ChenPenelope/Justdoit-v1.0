const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT || 3306,
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');

  // Create user table if it doesn't exist
  const createUserTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    chips INT DEFAULT 1000,
    history_ids JSON, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;
  
  db.query(createUserTableQuery, (err, result) => {
  if (err) {
    console.error('Failed to create user table:', err.stack);
    return;
  }
  console.log('User table created or already exists.');
  });
});

module.exports = db;