import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <header className="text-gray-700">
      <div className="flex p-5 flex-col sm:flex-row">
        <Link
          className="flex title-font font-medium items-center text-gray-900 mb-4 sm:mb-0"
          to="/"
        >
          <span className="ml-3 text-xl">House Tracker</span>
        </Link>
        <nav className="sm:ml-auto flex-wrap text-base items-center justify-center">
          <ul className="flex flex-col sm:flex-row">
            <li className="sm:p-4">
              <Link to="/Budget">Budget</Link>
            </li>
            <li className="sm:p-4">
              <Link to="/Properties">Properties</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navigation;
