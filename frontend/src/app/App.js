import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Home, Login, Game } from '../pages/exporter';
import React from 'react';

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
            </Router>
        </main>
    );
}

export default App;
