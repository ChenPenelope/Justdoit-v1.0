const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const app = require('./app');

const userRoutes = require('./routes/userRoutes'); // Import the user routes

dotenv.config();
const port = 3001;

app.use(cors());
app.use(express.json());

// Use the user routes
app.use('/api/users', userRoutes);

// Serve frontend static files
app.use('/Justdoit-v1.0', express.static(path.join(__dirname, './dist'))); // Adjust path if using React

// Catch-all to serve `index.html` for non-API routes
app.get('/Justdoit-v1.0/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});


// Start the server
app.listen(port, '0,0,0,0', () => {
  console.log(`Server running at http://localhost:${port}`);
});
