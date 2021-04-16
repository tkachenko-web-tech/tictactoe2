const express = require('express');
const router = express.Router();
const GameService = require('../services/game.service');

router.post('/', async (req, res) => {
    const game = await GameService.create();
    res.json({ data: game });
})

router.post('/join', async (req, res) => {
    const { gameId, userId } = req.body;
    const game = await GameService.joinUser(gameId, userId);
    game.users = game.users.map(x => {
        if (x.hasOwnProperty('username'))
            delete x.username
        if (x.hasOwnProperty('password'))
            delete x.password
        return x;
    });
    res.json({ data: game });
})

router.get('/user/:userId', async (req, res) => {
    const userId = req.params.userId;
    const games = await GameService.getByUserId(userId);
    res.json({ data: games });
})

module.exports = router;
