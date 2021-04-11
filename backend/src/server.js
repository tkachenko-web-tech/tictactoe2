const express = require('express');
const UserRouter = require('./routers/user.router');
const GameRouter = require('./routers/game.router');
const db = require('./db');
const http = require('http');
const gameGateway = require('./gateways/game.gateway');

db.sync();

const app = express();

app.use(express.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/user', UserRouter);
app.use('/game', GameRouter);

const server = http.createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    },
});

io.on('connection', client => {
    gameGateway(io, client);
});

server.listen(3001, () => {
    console.log(`Server listening on port 3001.`);
});
