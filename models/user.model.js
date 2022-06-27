const { db, DataTypes } = require('../utils/database.util');

const Users = db.define('users', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    email: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING
    },
    status: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'active'
    }
}, {
    timestamps: false
});

module.exports = { Users };