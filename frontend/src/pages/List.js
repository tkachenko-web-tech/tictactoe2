import { Auth } from '../components/Auth';
import { useState } from 'react';
import { request } from '../helpers';
import { Alert } from 'react-bootstrap';

export function List({ userId }) {
    const [userId, setUserId] = useState(userId);
    const [games, setGames] = useState([]);

    async function authInit(user) {
        setUserId(user);
        const { data: games } = await request(`/game/user/${userId}`, 'GET');
        if (games) {
            setGames(games);
        }
    }

    function InfoNotFinished() {
        const notFinishedGames = games.filter(x => x.status === 'NOT_FINISHED' || x.status === 'CREATED');
        return (<Alert>You have {games.length} processing games:</Alert>)
    }

    function InfoFinished() {
        const finishedGames = games.filter(x => x.status !== 'NOT_FINISHED' && x.status !== 'CREATED');
        return (<Alert>You have played {games.length}. Here is your history:</Alert>)
    }

    return (<div>
        <Auth authInit={authInit} />
        <div className="info">
            <InfoNotFinished />
            <InfoFinished />
        </div>
    </div>)
}
