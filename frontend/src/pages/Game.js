import { Auth } from '../components/Auth';
import { useHistory, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { request } from '../helpers';
import { Alert, Button } from 'react-bootstrap';
import { Square } from '../components/Square';

const SOCKET_ENDPOINT = 'http://localhost:3001';

export function Game() {
    const history = useHistory();
    const { gameId } = useParams();
    const [userId, setUserId] = useState(null);
    const [game, setGame] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const socket = io(SOCKET_ENDPOINT);

    async function authInit(userId) {
        setUserId(userId);
        const { data: game } = await request('game/join', 'post', { gameId, userId });
        if (!game) {
            alert(`The game does not exists or it already has two joined players.`);
            history.push('/');
        } else {
            setGame(game);
            socket.emit('join', { gameId, userId });

            socket.on('game-state', data => {
                setGame(data);
                if (data.oUserId === userId)
                    setUserRole('O');
                else if (data.xUserId === userId)
                    setUserRole('X');
            });

        }
    }

    function makeTurn(squareNumber) {
        socket.emit('turn', { gameId: game.id, userId, squareNumber });
    }

    function Status() {
        if (userRole === null)
            return (<Alert>Wait for another player to join.</Alert>);
        if (game.status === 'TIE')
            return (<Alert>Game is finished! It&apos;s a tie!</Alert>);
        if (game.status === 'X_WIN' && userRole === 'X' || game.status === 'O_WIN' && userRole === 'O')
            return (<Alert>Game is finished! You won!</Alert>);
        if (game.status === 'X_WIN' && userRole === 'O' || game.status === 'O_WIN' && userRole === 'X')
            return (<Alert>Game is finished! You lose.</Alert>)
        if (userRole === 'X' && game.turn % 2 === 0 || userRole === 'O' && game.turn % 2 !== 0) {
            return (<Alert>It&apos;s your turn.</Alert>);
        } else {
            return (<Alert>It&apos; your opponent&apos;s turn.</Alert>);
        }
    }

    function handleBackHome() {
        history.push('/');
    }

    return (
        <div className="game">
            <Auth authInit={authInit}/>
            <div className="board">
                {
                    game?.squares?.map((square, i) => (
                        <Square key={i} makeTurn={makeTurn} value={square} userRole={userRole} game={game} id={i} />
                    ))
                }
            </div>
            <Status />
            <Button onClick={handleBackHome}>Back Home</Button>
        </div>
    );
}
