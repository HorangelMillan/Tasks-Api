// enviroment variables by file .env
require('dotenv').config();

const { Sequelize, DataTypes } = require('sequelize');

const db = new Sequelize({
    dialect: 'postgres',
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 'there is not port',
    database: process.env.DATABASE || 'there is not database',
    username: process.env.PG_USERNAME || 'there is not username',
    password: process.env.PG_PASSWORD || 'there is not password',
    logging: false
});

module.exports = { db, DataTypes };