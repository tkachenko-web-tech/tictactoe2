const express = require('express');
const UserRouter = require('./routers/user.router');
const GameRouter = require('./routers/game.router')

const app = express();

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/user', UserRouter);
app.use('/game', GameRouter);

app.listen(3001, () => {
    console.log('Backend server is up and running.');
});

module.exports = app;
