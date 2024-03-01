import React, { FunctionComponent, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Listing } from './Listing';
import { RetrieveAllProperties } from '../../../_services/ApiService/houseApi';

const PREFIX = 'ListingDirectory';

const classes = {
  directoryContainer: `${PREFIX}-directoryContainer`,
  childNav: `${PREFIX}-childNav`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.directoryContainer}`]: {
    marginTop: 0,
  },

  [`& .${classes.childNav}`]: {
    margin: `${theme.spacing(2)} 0 0 0`,
  }
}));

const ListingDirectory: FunctionComponent = () => {
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const [houses, setHouses] = useState<any>();
  const [error, setError] = useState<any>();

  const controller = new AbortController();
  const { signal } = controller;

  useEffect(() => {
    RetrieveAllProperties({ signal })
      .then((r) => r.json())
      .then((r) => {
        setHouses(r);
        setLoaded(true);
      })
      .catch((e) => {
        setError(e);
        setLoaded(true);
      });
    return () => controller.abort();
    // eslint-disable-next-line
  }, []);

  if (error) {
    return <Root>Failed to load: {error.message}</Root>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const houseEls = houses.map((h: any) => (
    <Grid key={h.ID} item xs>
      <Listing house={h} detailsUrl={h.ID} />
    </Grid>
  ));

  return (
    <div>
      <div className={classes.childNav}>
        <Button size="small" component={Link} to='add'>
          Add new
        </Button>
        <Button size="small" component={Link} to='check'>
          Check Existing
        </Button>
      </div>
      <Grid container spacing={5} direction="column" className={classes.directoryContainer}>
        {houseEls}
      </Grid>
    </div>
  );
};

export default ListingDirectory;
