const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Test route
app.get('/', (req, res) => {
  res.send('Backend is running...');
});

// Add data to MySQL
app.post('/add', (req, res) => {
  const { name, email } = req.body;
  const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
  db.query(query, [name, email], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send('User added!');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
