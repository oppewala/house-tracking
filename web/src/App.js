import React from 'react';
import './App.css';
import Budget from './finance/Budget'
import HouseList from "./house-list/HouseList";

function App() {
  return (
    <div className="App">
      <h1>House Tracking</h1>
        <HouseList />
      <Budget />
    </div>
  );
}

export default App;
