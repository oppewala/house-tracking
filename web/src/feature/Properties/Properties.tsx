import React from 'react';
import { styled } from '@mui/material/styles';
import { Route, useParams } from 'react-router-dom';
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
    padding: `${theme.spacing(6)} ${theme.spacing(5)} 0`,
  },

  [`& .${classes.sectionTitle}`]: {
    height: theme.spacing(7),
    marginBottom: theme.spacing(3),
    verticalAlign: 'bottom',
  }
}));

const Properties = () => {
  return (
    <div className={classes.container}>
      <Typography variant="h3" className={classes.sectionTitle}>
        Properties
      </Typography>
      <Route>
        <Route path='add' element={<NewProperty />} />
        <Route path='check' element={<PropertyCheck />} />
        <Route path=':id' element={<ListingRoute />} />
        <Route element={<ListingDirectory />} />
      </Route>
    </div>
  );
};

const ListingRoute = () => {
  const { id } = useParams();

  return <StyledListing id={id ?? ''} />;
};

export default Properties;
