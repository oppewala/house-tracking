import React from 'react';
import './App.css';
import Budget from './finance/Budget'
import Properties from "./properties/Properties";

function App() {
  return (
    <div className="App">
      <h1>House Tracking</h1>
      <Properties />
      <Budget />
    </div>
  );
}

export default App;
