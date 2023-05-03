const { DataTypes } = require('sequelize');
const { db } = require('../config/db');

const Category = db.define('categories', {

    name: {
        type: DataTypes.STRING(30),
        allowNull: false
    }

});

module.exports = Category;