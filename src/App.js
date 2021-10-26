import React from 'react';
import { Route, Switch } from 'react-router';
import Config from './pages/Config';
import Login from './pages/Login';
import Game from './pages/Game';
import Feedbacks from './pages/Feedbacks';

export default function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>
          SUA VEZ
        </p>
      </header> */}
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/config" component={ Config } />
        <Route path="/game" component={ Game } />
        <Route path="/feedbacks" component={ Feedbacks } />

      </Switch>
    </div>
  );
}
