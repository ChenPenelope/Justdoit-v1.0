const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const { Sequelize, DataTypes } = require("sequelize");


// Define the User model
const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    chips: {
        type: DataTypes.INTEGER,
        defaultValue: 1000,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
}, {
    tableName: "users", // Specify the table name
    timestamps: false,  // Disable Sequelize's automatic timestamps
});

// Route to create a new user
router.post("/", async (req, res) => {
    try {
        const { name } = req.body;

        // Check if a user with the same name already exists
        const existingUser = await User.findOne({ where: { username: name } });
        if (existingUser) {
            return res.status(400).json("Username already taken.");
        }

        // Create a new user
        const newUser = await User.create({
            username: name,
            chips: 1000,
        });

        res.status(201).json({
            message: "User created successfully",
            user: newUser,
        });
    } catch (err) {
        console.error("Error creating user:", err.message);
        res.status(500).json({ error: "Failed to create user" });
    }
});

// Route to get all users
router.get("/", async (req, res) => {
    try {
        // Retrieve all users
        const users = await User.findAll();

        res.status(200).json(users);
    } catch (err) {
        console.error("Error retrieving users:", err.message);
        res.status(500).json({ error: "Failed to retrieve users" });
    }
});

// Route to delete all users
router.delete("/", async (req, res) => {
    try {
        // Delete all users
        await User.destroy({ where: {}, truncate: true });

        res.status(200).json({
            message: "All users deleted successfully",
        });
    } catch (err) {
        console.error("Error deleting users:", err.message);
        res.status(500).json({ error: "Failed to delete users" });
    }
});

// Route to get an user by name
router.get("/name/:name", async (req, res) => {
    try {
        const { name } = req.params;

        // Retrieve user by username
        const user = await User.findOne({ where: { username: name } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User retrieved successfully",
            user,
        });
    } catch (err) {
        console.error("Error retrieving user:", err.message);
        res.status(500).json({ error: "Failed to retrieve user" });
    }
});

// Route to update chips of an user
router.put("/:id/chips", async (req, res) => {
    try {
        const { id } = req.params;
        const { chips } = req.body;

        // Update user's chips
        await User.update({ chips }, { where: { id } });

        res.status(200).json({
            message: "Chips updated successfully",
        });
    } catch (err) {
        console.error("Error updating chips:", err.message);
        res.status(500).json({ error: "Failed to update chips" });
    }
});

// Route to delete an user
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Delete user
        await User.destroy({ where: { id } });

        res.status(200).json({
            message: "User deleted successfully",
        });
    } catch (err) {
        console.error("Error deleting user:", err.message);
        res.status(500).json({ error: "Failed to delete user" });
    }
});


// Route to update a user's username
router.put("/:id/username", async (req, res) => {
    try {
        const { id } = req.params;
        const { username } = req.body;

        // Update user's username
        await User.update({ username }, { where: { id } });

        res.status(200).json({
            message: "Username updated successfully",
        });
    } catch (err) {
        console.error("Error updating username:", err.message);
        res.status(500).json({ error: "Failed to update username" });
    }
});

// Route to check admin's password
router.post('/admin', (req, res) => {
    const { password } = req.body;
    if(password === 'admin')
      res.send(true);
    else
      res.send(false);
});

module.exports = router;