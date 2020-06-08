import React from 'react';
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom';
import PropertyDirectory from './property-directory/PropertyDirectory';
import NewProperty from './new-property/NewProperty';
import PropertyCheck from './property-check/PropertyCheck';

const Properties = () => {
  const match = useRouteMatch();

  return (
    <div>
      <h2>Properties</h2>
      <Switch>
        <Route path={`${match.path}/add`}>
          <NewProperty />
        </Route>
        <Route path={`${match.path}/check`}>
          <PropertyCheck />
        </Route>
        <Route path={match.path}>
          <PropertyDirectory />
          <Link to={`${match.url}/add`}>Add new</Link>
          <Link to={`${match.url}/check`}>Check Existing</Link>
        </Route>
      </Switch>
    </div>
  );
};

export default Properties;
