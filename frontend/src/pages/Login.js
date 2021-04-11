import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie/es6';
import { request } from '../helpers';

export function Login() {
    const cookies = new Cookies();
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(async () => {
        const userId = cookies.get('userId');
        if (userId) {
            const { data: user } = await request(`user/${userId}`, 'GET');
            if (!user)
                cookies.remove('userId');
            else
                history.push('/');
        }
    }, []);

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    async function handleLogin(event) {
        const { data: user } = await request('user/login', 'POST', { username, password });
        if (!user)
            alert('User not found or password is incorrect.');
        else {
            cookies.set('userId', user.id, { sameSite: true });
            history.push('/');
        }
    }

    async function handleRegister(event) {
        const { data: user } = await request('user', 'POST', { username, password });
        if (!user)
            alert('User with this name already exists.');
        else {
            cookies.set('userId', user.id, { sameSite: true });
            history.push('/');
        }
    }

    return (<div className="login">
            <Form>
                <Form.Group size="lg" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholer="Enter username"
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button block disabled={!validateForm()} onClick={handleLogin} >
                    Log in
                </Button>
                <Button block disabled={!validateForm()} onClick={handleRegister}>
                    Register
                </Button>
            </Form>
        </div>
    );
}
