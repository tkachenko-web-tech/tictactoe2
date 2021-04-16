const Game = require('../models/game.model');
const User = require('../models/user.model');
const { v4: uuid } = require('uuid');

const randomBool = () => Math.random() < 0.5;

const STATUS = {
    TIE: 'TIE',
    X_WIN: 'X_WIN',
    O_WIN: 'O_WIN',
    NOT_FINISHED: 'NOT_FINISHED',
    CREATED: 'CREATED'
}

const PLAYER = {
    X: 'X',
    O: 'O'
}

const afterQuery = (x) => {
    return x ? x.get({ plain: true }) : null;
};

/*
0 1 2
3 4 5
6 7 8
 */

const WINS = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]];

class GameService {

    async create() {
        return await Game.create({ id: uuid(), isFirstX: randomBool() }).then(afterQuery);
    }

    async get(gameId) {
        if (!gameId)
            return null;
        return await Game.findOne({ where: { id: gameId } }).then(afterQuery);
    }

    async getByUserId(userId) {
        if (!userId)
            return [];
        const user = await User.findOne({ where: { id: userId }, include: Game }).then(afterQuery);
        if (!user)
            return [];
        const notFinishedGames = [];
        const finishedGames = [];

        await Promise.all(user.games.map(async game => {
            if (game.status !== STATUS.CREATED)
                game.opponent = await User.findOne({ where: { id: game.xUserId === userId ? game.oUserId : game.xUserId } }).then(afterQuery);
            if (game.status === STATUS.CREATED || game.status === STATUS.NOT_FINISHED)
                notFinishedGames.push(game);
            else
                finishedGames.push(game);
        }));

        return {
            notFinishedGames: notFinishedGames.sort((a, b) =>
                new Date(b.updatedAt) - new Date(a.updatedAt),
            ),
            finishedGames: finishedGames.sort((a, b) =>
                new Date(b.updatedAt) - new Date(a.updatedAt),
            ),
        };
    }


    async joinUser(gameId, userId) {
        if (!gameId || !userId)
            return null;
        const user = await User.findOne({ where: { id: userId } });
        const game = await Game.findOne({ where: { id: gameId }, include: User });
        if (!user || !game || game.users.length > 2)
            return null;
        if (game.users.findIndex(x => x.id === userId) !== -1)
            return afterQuery(game);
        await game.addUser(user);
        const joinedUsers = await game.getUsers();
        if (joinedUsers.length === 2) {
            const ids = joinedUsers.map(x => x.id);
            if (randomBool())
                [game.xUserId, game.oUserId] = ids;
            else
                [game.oUserId, game.xUserId] = ids;
            game.status = STATUS.NOT_FINISHED;
            await game.save();
        }
        return afterQuery(game);
    }

    async isUserJoined(gameId, userId) {
        if (!gameId || !userId)
            return false;
        const game = await Game.findOne({ where: { id: gameId }, include: User });
        if (!game)
            return false;
        return game.users.findIndex(x => x.id === userId) !== -1;
    }

    async makeTurn(gameId, userId, squareNumber) {
        const game = await Game.findOne({ where: { id: gameId } });
        const whichTurn = this.whichTurn(game.turn);

        // checks
        if (game.status !== STATUS.NOT_FINISHED || squareNumber > 8 || squareNumber < 0)
            return game;
        if (game.squares[squareNumber] !== '')
            return game;
        if (whichTurn === PLAYER.X && game.xUserId !== userId || whichTurn === PLAYER.O && game.oUserId !== userId)
            return game;

        const squares = game.squares;
        squares[squareNumber] = whichTurn;
        game.squares = squares;
        game.turn = game.turn + 1;
        game.status = this.newStatus(game.squares, game.turn);
        if (game.status === STATUS.X_WIN || game.status === STATUS.O_WIN)
            game.winner = game.turn % 2 === 0 ? game.oUserId : game.xUserId;
        await game.save();
        return await Game.findOne({ where: { id: game.id } }).then(afterQuery);
    }

    newStatus(squares, turn) {
        for (const win of WINS) {
            const [a, b, c] = win;
            if (squares[a] + squares[b] + squares[c] === 'XXX')
                return STATUS.X_WIN;
            if (squares[a] + squares[b] + squares[c] === 'OOO')
                return STATUS.O_WIN;
        }
        if (turn >= 9)
            return STATUS.TIE;
        return STATUS.NOT_FINISHED;
    }

    whichTurn(turn) {
        return turn % 2 === 0 ? PLAYER.X : PLAYER.O;
    }

    async isFull(gameId) {
        const game = await Game.findOne({ where: { id: gameId }, include: User });
        if (!game)
            return true;
        return game.users.length > 2;
    }

}

const gameService = new GameService();
module.exports = gameService;
