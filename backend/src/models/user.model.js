const { DataTypes, Model } = require('sequelize');
const db = require('../db');

class User extends Model {
}

User.init({
    id: { type: DataTypes.STRING, primaryKey: true },
    username: DataTypes.STRING,
    password: DataTypes.STRING
}, {
    sequelize: db,
    modelName: 'user',
});

module.exports = User;
