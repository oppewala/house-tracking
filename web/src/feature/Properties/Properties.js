import React from 'react';
import { Switch, Route, useRouteMatch, useParams } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import { Typography } from '@mui/material';
import ListingDirectory from './property-directory/ListingDirectory';
import NewProperty from './new-property/NewProperty';
import PropertyCheck from './property-check/PropertyCheck';
import Listing from './listing/Listing';

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
        <Route path={`${match.path}/:id`}>
          <ListingRoute />
        </Route>
        <Route path={match.path}>
          <ListingDirectory />
        </Route>
      </Switch>
    </div>
  );
};

const ListingRoute = () => {
  const { id } = useParams();

  return <Listing id={id} />;
};

export default Properties;
