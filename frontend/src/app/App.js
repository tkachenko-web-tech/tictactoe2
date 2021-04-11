import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Home, Login } from '../pages/exporter';
import React from 'react';

function App() {
    return (
        <main className="main">
            <Router>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route exact path="/login">
                    <Login/>
                </Route>
            </Router>
        </main>
    );
}

export default App;
