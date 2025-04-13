require("dotenv").config();
const { Sequelize } = require("sequelize");

let sequelize;

if (process.env.USE_LOCAL_DB === "true") {
    console.log("use local db");
    sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,
        dialect: "mysql",
        logging: false,
    });

    sequelize.authenticate()
        .then(() => {
            console.log("Connected to MySQL database successfully.");
        })
        .catch((err) => {
            console.error("Unable to connect to the database:", err.message);
        });
} else {
    console.log("use render db");
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

    sequelize.authenticate()
        .then(() => {
            console.log("Connected to PostgreSQL database successfully.");
        })
        .catch((err) => {
            console.error("Unable to connect to the database:", err.message);
        });
}

sequelize.sync()
    .then(() => {
        console.log("User table created or already exists.");
    })
    .catch((err) => {
        console.error("Failed to sync database:", err.message);
    });

module.exports = sequelize;