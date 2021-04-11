const { DataTypes, Model } = require('sequelize');
const UserModel = require('./user.model');
const db = require('../db');

class GameModel extends Model {
    getSquares() {
        return this.squares.split(';');
    }

    setSquares(squares) {
        return this.sqaures.join(';');
    }
}

GameModel.init({
    id: { type: DataTypes.STRING, primaryKey: true },
    squares: { type: DataTypes.STRING },
}, {
    sequelize: db,
    modelName: 'game',
});

(async () => {
    await db.sync();
})();

GameModel.hasOne(UserModel, { foreignKey: 'xUserId' });
GameModel.hasOne(UserModel, { foreignKey: 'oUserId' });

module.exports = GameModel;
