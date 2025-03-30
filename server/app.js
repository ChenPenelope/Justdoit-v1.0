require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");


const app = express();
const port = 3001;

const sequelize = new Sequelize(process.env.RENDER_DB_URL, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false,
})



sequelize.sync()
.then(() => {
    console.log("User table created or already exists.");
})
.catch((err) => {
    console.error("Failed to sync database:", err.message);
});

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});
