require("dotenv").config();
const { Sequelize } = require("sequelize");

let sequelize;

if (process.env.DATABASE_URL) {
    console.log('使用 DATABASE_URL 連接數據庫');
    console.log('數據庫連接字符串:', process.env.DATABASE_URL.replace(/:[^:@]*@/, ':****@')); // 隱藏密碼
    
    // 使用 Render 提供的數據庫 URL
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            },
            connectTimeout: 60000,
            keepAlive: true,
            keepAliveInitialDelayMillis: 10000
        },
        logging: (msg) => console.log('Sequelize:', msg),
        pool: {
            max: 10,
            min: 0,
            acquire: 60000,
            idle: 10000
        },
        retry: {
            max: 10,
            match: [/Deadlock/i, /Connection refused/i, /Connection timed out/i, /ECONNREFUSED/i]
        }
    });
} else {
    console.log('使用單獨的數據庫配置連接');
    console.log('數據庫配置:', {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        database: process.env.DB_NAME || 'justdoit',
        user: process.env.DB_USER || 'justdoit'
    });
    
    // 本地開發環境
    sequelize = new Sequelize(
        process.env.DB_NAME || 'justdoit',
        process.env.DB_USER || 'justdoit',
        process.env.DB_PASSWORD || 'justdoit',
        {
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 5432,
            dialect: 'postgres',
            logging: (msg) => console.log('Sequelize:', msg),
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        }
    );
}

// 初始化數據庫
const initDatabase = async (retries = 10, delay = 10000) => {
    for (let i = 0; i < retries; i++) {
        try {
            console.log(`嘗試連接數據庫 (${i + 1}/${retries})...`);
            console.log('環境變量:', {
                NODE_ENV: process.env.NODE_ENV,
                DATABASE_URL: process.env.DATABASE_URL ? '已設置' : '未設置',
                DB_HOST: process.env.DB_HOST,
                DB_PORT: process.env.DB_PORT,
                DB_NAME: process.env.DB_NAME,
                DB_USER: process.env.DB_USER
            });
            
            // 測試連接
            await sequelize.authenticate();
            console.log('數據庫連接成功。');

            // 導入所有模型
            const models = require('./models');

            // 同步所有模型到數據庫
            await sequelize.sync({ alter: true });
            console.log('數據庫模型同步完成。');

            // 檢查是否需要創建初始管理員
            const adminCount = await models.Admin.count();
            if (adminCount === 0) {
                await models.Admin.create({
                    username: 'admin',
                    password: 'admin123'
                });
                console.log('初始管理員創建完成。');
            }

            return models;
        } catch (error) {
            console.error(`數據庫初始化嘗試 ${i + 1}/${retries} 失敗:`, error.message);
            console.error('詳細錯誤:', error);
            console.error('錯誤堆棧:', error.stack);
            
            if (i < retries - 1) {
                console.log(`等待 ${delay/1000} 秒後重試...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                console.error('數據庫初始化失敗，達到最大重試次數');
                throw error;
            }
        }
    }
};

// 執行初始化
initDatabase().catch(error => {
    console.error('數據庫初始化最終失敗:', error);
    process.exit(1);
});

module.exports = sequelize;