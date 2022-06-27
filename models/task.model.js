const { db, DataTypes } = require('../utils/database.util');

const Tasks = db.define('tasks', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    title: {
        allowNull: false,
        type: DataTypes.STRING
    },
    limitDate: {
        allowNull: false,
        type: DataTypes.DATE
    },
    startDate: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Date.now()
    },
    finishDate: {
        allowNull: true,
        type: DataTypes.DATE
    },
    status: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'active'
    }
}, {
    timestamps: false
});

module.exports = { Tasks };