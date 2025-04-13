require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const sequelize = require("./db");

const app = express();
const port = 3001;

// CORS configuration
const corsOptions = {
  origin: '*', // 在生產環境中應該設置為具體的域名
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.json({ message: "Welcome to JustDoIt API Server" });
});

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something broke!" });
});

module.exports = app;
