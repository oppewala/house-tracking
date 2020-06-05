import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

function Navigation() {
  return (
    <nav>
      <h1>House Tracking</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Budget">Budget</Link>
        </li>
        <li>
          <Link to="/Properties">Properties</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
