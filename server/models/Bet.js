const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const Bet = sequelize.define('Bet', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    bet_type: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(20),
        defaultValue: 'pending'
    }
}, {
    tableName: 'bets',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// 設置關聯
Bet.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Bet, { foreignKey: 'user_id' });

module.exports = Bet; 