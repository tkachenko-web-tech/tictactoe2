import React, { useContext, useEffect, useState } from 'react';
import { request, UserContext } from '../helpers';
import { Alert, Button, ListGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { STATUS } from '../helpers';

export function List() {
    const history = useHistory();
    const userId = useContext(UserContext);
    const [finishedGames, setFinishedGames] = useState([]);

    useEffect(() => {
        const init = async () => {
            const { data } = await request(`game/user/${userId}`, 'GET');
            const { finishedGames, notFinishedGames } = data;
            setFinishedGames(finishedGames);
        }

        if (typeof userId === 'string')
            init();
    }, [userId])


    return (<div>
        <div className="info text-center">
            <p>Played</p>
            <Alert variant="primary">{finishedGames.length}</Alert>
            <p>Wins</p>
            <Alert variant="success">{finishedGames.filter(x => x.winner === userId).length}</Alert>
            <p>Losses</p>
            <Alert variant="danger">{finishedGames.filter(x => x.winner !== userId && x.status !== STATUS.TIE).length}</Alert>
            <p>Ties</p>
            <Alert variant="secondary">{finishedGames.filter(x => x.status === STATUS.TIE).length}</Alert>
        </div>
        <Button onClick={() => history.push('/')}>Back Home</Button>
    </div>);
}
