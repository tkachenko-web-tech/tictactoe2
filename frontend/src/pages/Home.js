import React, { useContext} from 'react';
import { ListGroup } from 'react-bootstrap';
import { cookies } from '../helpers';
import { useHistory } from 'react-router-dom';
import { request, UserContext } from '../helpers';

export function Home() {
    const history = useHistory();
    const userId = useContext(UserContext);

    function handleExit() {
        cookies.remove('userId', { sameSite: true, path: '/' });
        history.push('/login');
    }

    async function handleCreateGame() {
        if (!(typeof userId === 'string'))
            return;
        const { data: game } = await request('game', 'POST');
        history.push(`/game/${game.id}`);
    }

    if (userId)
        return (<div className="home">
            <ListGroup>
                <ListGroup.Item size="lg" className="text-center m-1" action onClick={handleCreateGame} active>
                    Create game
                </ListGroup.Item>
                <ListGroup.Item className="text-center m-1" action onClick={() => history.push('list')} active>
                    Statistics
                </ListGroup.Item>
                <ListGroup.Item className="text-center m-1" action onClick={handleExit} active>
                    Log out
                </ListGroup.Item>
            </ListGroup>
        </div>);
}
