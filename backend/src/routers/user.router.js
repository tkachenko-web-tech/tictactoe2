const express = require('express');
const router = express.Router();
const UserService = require('../services/user.service');

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const user = await UserService.getUserById(userId);
    res.json({ data: user });
});

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    const user = await UserService.createUser(username, password);
    res.json({ data: user });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await UserService.getUserByUsernameAndPassword(username, password);
    res.json({ data: user });
})

module.exports = router;
