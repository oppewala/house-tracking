import React from 'react';
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PropertyDirectory from './property-directory/PropertyDirectory';
import NewProperty from './new-property/NewProperty';
import PropertyCheck from './property-check/PropertyCheck';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: `${theme.spacing() * 6}px ${theme.spacing() * 5}px 0`,
  },
}));

const Properties = () => {
  const match = useRouteMatch();
  const classes = useStyles();

  return (
    <div className={classes.container}>
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
