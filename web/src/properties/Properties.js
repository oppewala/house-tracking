import React from 'react';
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom';
import PropertyDirectory from './property-directory/PropertyDirectory';
import NewProperty from './new-property/NewProperty';
import PropertyCheck from './property-check/PropertyCheck';

const Properties = () => {
  const match = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${match.path}/add`}>
          <NewProperty />
        </Route>
        <Route path={`${match.path}/check`}>
          <PropertyCheck />
        </Route>
        <Route path={match.path}>
          <PropertyDirectory />
          <div className="flex space-x-4">
            <Link to={`${match.url}/add`} className="link">
              Add new
            </Link>
            <Link to={`${match.url}/check`} className="link">
              Check Existing
            </Link>
          </div>
        </Route>
      </Switch>
    </div>
  );
};

export default Properties;
