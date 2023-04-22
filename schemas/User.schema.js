const { DataTypes } = require('sequelize');
const { db } = require('../config/db');

const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    token: DataTypes.STRING,
    confirm: DataTypes.BOOLEAN
});

module.exports = User;