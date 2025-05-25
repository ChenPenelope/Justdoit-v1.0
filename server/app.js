require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const sequelize = require("./db");

const app = express();
const port = process.env.PORT || 8081;

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

// 服務靜態文件
app.use(express.static(path.join(__dirname, '../client/dist')));

// Routes
app.get("/", (req, res) => {
    res.json({ message: "Welcome to JustDoIt API Server" });
});

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

// 通配符路由 - 支持前端路由
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something broke!" });
});

// 啟動服務器
const startServer = async () => {
    try {
        // 等待數據庫初始化完成
        await sequelize.authenticate();
        
        app.listen(port, () => {
            console.log(`服務器運行在端口 ${port}`);
        });
    } catch (error) {
        console.error('無法啟動服務器:', error);
        process.exit(1);
    }
};

startServer();

module.exports = app;
