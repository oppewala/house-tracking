import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Budget from './finance/Budget';
import Properties from './properties/Properties';
import Navigation from './Template/Navigation';

function App() {
  return (
    <Router>
      <Navigation />
      <div className="App">
        <Switch>
          <Route path="/Budget">
            <Budget />
          </Route>
          <Route path="/Properties">
            <Properties />
          </Route>
          <Route path="/">
            <Budget />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
