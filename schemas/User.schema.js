const { DataTypes } = require('sequelize');
const { db } = require('../config/db');
const bcrypt = require('bcrypt');


const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: DataTypes.STRING,
    confirm: DataTypes.BOOLEAN
},
{
    hooks: {
        beforeCreate: async function(user){
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash( user.password, salt )        
        }
    }
}
);

module.exports = User;