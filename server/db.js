require("dotenv").config();
const { Sequelize } = require("sequelize");

let sequelize;

if (process.env.DATABASE_URL) {
    // 使用 Render 提供的數據庫 URL
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            },
            connectTimeout: 60000, // 增加連接超時時間
            keepAlive: true, // 保持連接
            keepAliveInitialDelayMillis: 10000 // 保持連接的初始延遲
        },
        logging: console.log, // 啟用日誌以便調試
        pool: {
            max: 10, // 增加連接池大小
            min: 0,
            acquire: 60000, // 增加獲取連接的超時時間
            idle: 10000
        },
        retry: {
            max: 10, // 增加重試次數
            match: [/Deadlock/i, /Connection refused/i, /Connection timed out/i, /ECONNREFUSED/i]
        }
    });
} else {
    // 本地開發環境
    sequelize = new Sequelize(
        process.env.DB_NAME || 'justdoit',
        process.env.DB_USER || 'justdoit',
        process.env.DB_PASSWORD || 'justdoit',
        {
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 5432,
            dialect: 'postgres',
            logging: console.log,
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
const initDatabase = async (retries = 10, delay = 10000) => { // 增加重試次數和延遲時間
    for (let i = 0; i < retries; i++) {
        try {
            console.log(`嘗試連接數據庫 (${i + 1}/${retries})...`);
            console.log('數據庫 URL:', process.env.DATABASE_URL ? '已設置' : '未設置');
            
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
                    password: 'admin123' // 請在生產環境中更改此密碼
                });
                console.log('初始管理員創建完成。');
            }

            return models;
        } catch (error) {
            console.error(`數據庫初始化嘗試 ${i + 1}/${retries} 失敗:`, error.message);
            console.error('詳細錯誤:', error);
            
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