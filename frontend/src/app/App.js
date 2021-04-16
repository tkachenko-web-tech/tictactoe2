import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Home, Login, Game, NotAuthPage, AuthPage } from '../pages';
import React from 'react';
import { List } from '../pages/List';

function App() {
    return (
        <main className="wrapper">
            <Router>
                <Route exact path="/">
                    <AuthPage Decorated={Home}/>
                </Route>
                <Route path="/game/:gameId">
                    <AuthPage Decorated={Game}/>
                </Route>
                <Route exact path="/list">
                    <AuthPage Decorated={List}/>
                </Route>
                <Route exact path="/login">
                    <NotAuthPage Decorated={Login}/>
                </Route>
            </Router>
        </main>
    );
}

export default App;
