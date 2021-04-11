import React, { useState } from 'react';
import { Auth } from '../components/Auth';
import { Button } from 'react-bootstrap';
import Cookies from 'universal-cookie/es6';
import { useHistory } from 'react-router-dom';

export function Home() {
    const history = useHistory();
    const cookies = new Cookies();
    const [user, setUser] = useState(null);

    function handleExit() {
        cookies.remove('userId');
        history.push('/login');
    }

    function handleCreateGame() {
        const userId = user;
    }

    return (<div className="home">
        <Auth setUser={setUser}/>
        <Button onClick={handleCreateGame}>Создать игру</Button>
        <Button>Список игр</Button>
        <Button onClick={handleExit}>Выйти</Button>
    </div>);
}
