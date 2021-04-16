import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Home, Login, Game } from '../pages';
import React from 'react';
import { List } from '../pages/List';

function App() {
    return (
        <main className="wrapper">
            <Router>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route exact path="/login">
                    <Login/>
                </Route>
                <Route path="/game/:gameId">
                    <Game />
                </Route>
                <Route exact path="/list">
                    <List />
                </Route>
            </Router>
        </main>
    );
}

export default App;
