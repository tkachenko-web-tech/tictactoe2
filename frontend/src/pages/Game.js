import { Square } from '../components';
import { useHistory, useParams } from 'react-router-dom';
import React, { useState, useContext, useEffect } from 'react';
import { io } from 'socket.io-client';
import { request, STATUS, PLAYER, UserContext } from '../helpers';
import { Alert, Button } from 'react-bootstrap';

const SOCKET_ENDPOINT = 'http://localhost:3001';
const socket = io(SOCKET_ENDPOINT);


export function Game() {
    const history = useHistory();
    const { gameId } = useParams();
    const userId = useContext(UserContext);
    const [game, setGame] = useState(null);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const init = async () => {
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
                        setUserRole(PLAYER.O);
                    else if (data.xUserId === userId)
                        setUserRole(PLAYER.X);
                });
            }
        }

        if (typeof userId === 'string')
            init();
    }, [userId])

    function makeTurn(squareNumber) {
        socket.emit('turn', { gameId: game.id, userId, squareNumber });
    }

    function Status() {
        if (userRole === null)
            return (<Alert>Wait for another player to join. Use the following link to invite: <br /> <a href={window.location.href}>{window.location.href}</a></Alert>);
        if (game.status === STATUS.TIE)
            return (<Alert>Game is finished! It&apos;s a tie!</Alert>);
        if (game.status === STATUS.X_WIN && userRole === PLAYER.X || game.status === STATUS.O_WIN && userRole === PLAYER.O)
            return (<Alert>Game is finished! You won!</Alert>);
        if (game.status === STATUS.X_WIN && userRole === PLAYER.O || game.status === STATUS.O_WIN && userRole === PLAYER.X)
            return (<Alert>Game is finished! You lose.</Alert>);
        if (userRole === PLAYER.X && game.turn % 2 === 0 || userRole === PLAYER.O && game.turn % 2 !== 0) {
            return (<Alert>It&apos;s your turn.</Alert>);
        } else {
            return (<Alert>It&apos; your opponent&apos;s turn.</Alert>);
        }
    }

    function handleBackHome() {
        history.push('/');
    }

    return (
        <div className="text-center">
            <div className="game">
                <div className="board">
                    {
                        game?.squares?.map((square, i) => (
                            <Square key={i} makeTurn={makeTurn} value={square} userRole={userRole} game={game} id={i}/>
                        ))
                    }
                </div>
            </div>
            <Status/>
            <Button onClick={handleBackHome}>Back Home</Button>
        </div>
    );
}
