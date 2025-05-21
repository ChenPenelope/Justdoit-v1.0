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
            }
        },
        logging: false
    });
} else {
    // 本地開發環境
    sequelize = new Sequelize(
        process.env.DB_NAME || 'justdoit',
        process.env.DB_USER || 'root',
        process.env.DB_PASSWORD || '',
        {
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 3306,
            dialect: 'mysql',
            logging: false
        }
    );
}

// 初始化數據庫
const initDatabase = async () => {
    try {
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
        console.error('數據庫初始化錯誤:', error);
        throw error;
    }
};

// 執行初始化
initDatabase();

module.exports = sequelize;