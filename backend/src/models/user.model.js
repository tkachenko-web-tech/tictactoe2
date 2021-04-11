const { DataTypes, Model } = require('sequelize');
const db = require('../db');

class UserModel extends Model {
}

UserModel.init({
    id: { type: DataTypes.STRING, primaryKey: true },
    username: DataTypes.STRING,
    password: DataTypes.STRING
}, {
    sequelize: db,
    modelName: 'user',
});

(async () => {
    await db.sync();
})();

module.exports = UserModel;
