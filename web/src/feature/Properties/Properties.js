import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import PropertyDirectory from './property-directory/PropertyDirectory';
import NewProperty from './new-property/NewProperty';
import PropertyCheck from './property-check/PropertyCheck';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: `${theme.spacing() * 6}px ${theme.spacing() * 5}px 0`,
  },
  sectionTitle: {
    height: theme.spacing() * 7,
    marginBottom: theme.spacing() * 3,
    verticalAlign: 'bottom',
  },
}));

const Properties = () => {
  const classes = useStyles();
  const match = useRouteMatch();

  return (
    <div className={classes.container}>
      <Typography variant="h3" className={classes.sectionTitle}>
        Properties
      </Typography>
      <Switch>
        <Route path={`${match.path}/add`}>
          <NewProperty />
        </Route>
        <Route path={`${match.path}/check`}>
          <PropertyCheck />
        </Route>
        <Route path={match.path}>
          <PropertyDirectory />
        </Route>
      </Switch>
    </div>
  );
};

export default Properties;
