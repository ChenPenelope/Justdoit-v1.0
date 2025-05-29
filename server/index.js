const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const app = require('./app');

const userRoutes = require('./routes/userRoutes');

dotenv.config();
const port = 8081;

// 安全性標頭配置
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'");
  next();
});

// CORS 配置
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// 根路由處理 - 必須在最前面
app.get('/', (req, res) => {
  res.json({ message: "Welcome to JustDoIt API Server" });
});

// API 測試路由
app.get('/api', (req, res) => {
  res.json({ message: "Hello from server!" });
});

// API 路由 - 移除 /api 前綴
app.use('/users', userRoutes);

// 靜態文件服務 - 修改路徑
app.use(express.static(path.join(__dirname, '../client/dist')));

// 所有其他路由重定向到前端
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// 錯誤處理中間件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

// 啟動服務器
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
});