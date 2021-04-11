import React, { useState } from 'react';
import { Auth } from '../components/Auth';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import Cookies from 'universal-cookie/es6';
import { useHistory } from 'react-router-dom';
import { request } from '../helpers';

export function Home() {
    const history = useHistory();
    const cookies = new Cookies();
    const [user, setUser] = useState(null);

    function handleExit() {
        cookies.remove('userId', { sameSite: true, path: '/' });
        history.push('/login');
    }

    async function handleCreateGame() {
        if (!user)
            return;
        const { data: game } = await request('game', 'POST');
        history.push(`/game/${game.id}`);
    }

    return (<div className="home">
        <Auth authInit={setUser}/>
        <ListGroup>
            <ListGroup.Item size="lg" className="text-center m-1" action onClick={handleCreateGame} active>
                Create game
            </ListGroup.Item>
            <ListGroup.Item className="text-center m-1" action onClick={() => {}} active>
                List of your games
            </ListGroup.Item>
            <ListGroup.Item className="text-center m-1" action onClick={handleExit} active>
                Log out
            </ListGroup.Item>
        </ListGroup>
    </div>);
}
