const GameService = require('../services/game.service');

const gameGateway = (server, client) => {
    console.log('Client connected');

    client.on('join', async data => {
        const { gameId, userId } = data;
        if (!(await GameService.isUserJoined(gameId, userId))) {
            client.disconnect(true);
            return;
        }

        const game = await GameService.get(gameId);
        if (!game) {
            client.disconnect(true);
            return
        }

        client.join(gameId);
        server.in(gameId).emit('game-state', game);
    });

    client.on('turn', async data => {
        console.log(data);
        const { gameId, userId, squareNumber } = data;
        if (!(await GameService.isUserJoined(gameId, userId))) {
            client.disconnect(true);
            return;
        }

        const game = await GameService.makeTurn(gameId, userId, squareNumber);
        server.in(gameId).emit('game-state', game);
    })

    client.on('disconnect', () => {
        console.log('Client disconnected');
    })
}

module.exports = gameGateway;
