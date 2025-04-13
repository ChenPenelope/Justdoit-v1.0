require("dotenv").config();
const { Sequelize } = require("sequelize");

let sequelize;

// 檢查是否使用本地數據庫
if (process.env.USE_LOCAL_DB === "true") {
    console.log("Using local MySQL database");
    sequelize = new Sequelize(
        process.env.DB_NAME || 'bet',
        process.env.DB_USER || 'root',
        process.env.DB_PASSWORD || 'root',
        {
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 3306,
            dialect: "mysql",
            logging: false,
        }
    );
} else {
    console.log("Using production database");
    // 如果提供了 RENDER_DB_URL，使用它
    if (process.env.RENDER_DB_URL) {
        console.log("Using RENDER_DB_URL");
        sequelize = new Sequelize(process.env.RENDER_DB_URL, {
            dialect: "postgres",
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            },
            logging: false,
        });
    } else {
        // 否則使用單獨的配置
        console.log("Using individual database configuration");
        sequelize = new Sequelize(
            process.env.DB_NAME || 'bet',
            process.env.DB_USER,
            process.env.DB_PASSWORD,
            {
                host: process.env.DB_HOST,
                port: process.env.DB_PORT || 3306,
                dialect: "mysql",
                logging: false,
            }
        );
    }
}

// 測試數據庫連接
sequelize.authenticate()
    .then(() => {
        console.log("Database connection established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err.message);
    });

// 同步數據庫模型
sequelize.sync()
    .then(() => {
        console.log("Database models synchronized successfully.");
    })
    .catch((err) => {
        console.error("Failed to sync database models:", err.message);
    });

module.exports = sequelize;