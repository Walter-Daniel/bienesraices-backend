const { DataTypes } = require('sequelize');
const { db } = require('../config/db');

const Estate = db.define('estate', {
    
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    direction: {
        type: DataTypes.STRING,
        allowNull: false
    },
    size: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    bedroom: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    bathroom: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    state: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }   
});

module.exports = Estate;