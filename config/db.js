const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config({path: '.env'})

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: 3306,
    dialect: 'mysql',
    //logging: false,
});

module.exports = {
    db
}