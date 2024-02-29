import React from 'react';
import { styled } from '@mui/material/styles';
import { Switch, Route, useRouteMatch, useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import ListingDirectory from './property-directory/ListingDirectory';
import NewProperty from './new-property/NewProperty';
import PropertyCheck from './property-check/PropertyCheck';
import Listing from './listing/Listing';

const PREFIX = 'Properties';

const classes = {
  container: `${PREFIX}-container`,
  sectionTitle: `${PREFIX}-sectionTitle`
};

const StyledListing = styled(Listing)((
  {
    theme
  }
) => ({
  [`& .${classes.container}`]: {
    padding: `${theme.spacing() * 6}px ${theme.spacing() * 5}px 0`,
  },

  [`& .${classes.sectionTitle}`]: {
    height: theme.spacing() * 7,
    marginBottom: theme.spacing() * 3,
    verticalAlign: 'bottom',
  }
}));

const Properties = () => {

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

  return <StyledListing id={id} />;
};

export default Properties;
