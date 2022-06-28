import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route path="/" component={ Login } />
        </Switch>
      </header>
    </div>
  );
}
