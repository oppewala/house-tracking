import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Budget from './finance/Budget';
import Properties from './properties/Properties';
import Navigation from './Template/Navigation';

function App() {
  return (
    <div className="w-full max-w-screen-lg">
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
        <footer className="bg-gray-200 mt-5">
          <div className="container px-5 py-5 mx-auto">House Tracker</div>
        </footer>
      </Router>
    </div>
  );
}

export default App;
