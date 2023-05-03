const { DataTypes } = require('sequelize');
const { db } = require('../config/db');

const Price = db.define('prices', {

    name: {
        type: DataTypes.STRING(30),
        allowNull: false
    }

});

module.exports = Price;