import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Budget from './finance/Budget';
import Properties from './properties/Properties';
import Navigation from './Template/Navigation';

function App() {
  return (
    <div className="w-full">
      <Router>
        <Navigation />
        <div className="mx-2">
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
    </div>
  );
}

export default App;
