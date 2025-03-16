const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Import the user routes
const db = require('./db'); // Import the database connection

dotenv.config();
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Test route
app.get('/api', (req, res) => {
  res.send('Backend is running...');
});

// Use the user routes
app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});