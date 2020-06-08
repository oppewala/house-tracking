import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import PropertyDirectory from './property-directory/PropertyDirectory';
import NewProperty from './new-property/NewProperty';

const Properties = () => {
  const match = useRouteMatch();

  return (
    <div>
      <h2>Properties</h2>
      <Switch>
        <Route path={`${match.path}/add`}>
          <NewProperty />
        </Route>
        <Route path={match.path}>
          <PropertyDirectory />
        </Route>
      </Switch>
    </div>
  );
};

export default Properties;
