import { Auth } from '../components/Auth';
import React, { useState } from 'react';
import { request } from '../helpers';
import { Alert, Button, ListGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export function List() {
    const history = useHistory();
    const [userId, setUserId] = useState(null);
    const [finishedGames, setFinishedGames] = useState([]);

    async function authInit(user) {
        setUserId(user);
        const { data } = await request(`game/user/${user}`, 'GET');
        const { finishedGames, notFinishedGames } = data;
        setFinishedGames(finishedGames);
    }

    return (<div>
        <Auth authInit={authInit}/>
        <div className="info text-center">
            <p>Played</p>
            <Alert variant="primary">{finishedGames.length}</Alert>
            <p>Wins</p>
            <Alert variant="success">{finishedGames.filter(x => x.winner === userId).length}</Alert>
            <p>Losses</p>
            <Alert variant="danger">{finishedGames.filter(x => x.winner !== userId && x.status !== 'TIE').length}</Alert>
            <p>Ties</p>
            <Alert variant="secondary">{finishedGames.filter(x => x.status === 'TIE').length}</Alert>
        </div>
        <Button onClick={() => history.push('/')}>Back Home</Button>
    </div>);
}
