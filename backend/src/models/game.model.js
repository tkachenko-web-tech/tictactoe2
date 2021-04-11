const { DataTypes, Model } = require('sequelize');
const User = require('./user.model');
const db = require('../db');

class Game extends Model {
}

Game.init({
    id: { type: DataTypes.STRING, primaryKey: true },
    squares: {
        type: DataTypes.STRING,
        get() {
            return this.getDataValue('squares').split(';');
        },
        set(s) {
            return this.setDataValue('squares', s.join(';'));
        },
        defaultValue: Array(9).fill('').join(';'),
    },
    turn: { type: DataTypes.INTEGER, defaultValue: 0 },
    xUserId: DataTypes.STRING,
    oUserId: DataTypes.STRING,
    status: { type: DataTypes.STRING, defaultValue: 'CREATED' }, // CREATED -> NOT_FINISHED -> TIE / X_WIN / O_WIN,
    winner: DataTypes.STRING
}, {
    sequelize: db,
    modelName: 'game',
});

Game.belongsToMany(User, { through: 'user_game' });
User.belongsToMany(Game, { through: 'user_game' });

module.exports = Game;
