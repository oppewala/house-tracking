import React, { FunctionComponent, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { Link, useRouteMatch } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import Button from '@mui/material/Button';
import { Listing } from './Listing';
import { RetrieveAllProperties } from '../../../_services/ApiService/houseApi';

const useStyles = makeStyles((theme) => ({
  directoryContainer: {
    marginTop: 0,
  },
  childNav: {
    margin: `${theme.spacing() * 2}px 0 0 0`,
  },
}));

const ListingDirectory: FunctionComponent = () => {
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const [houses, setHouses] = useState<any>();
  const [error, setError] = useState<any>();

  const controller = new AbortController();
  const { signal } = controller;
  const match = useRouteMatch();
  const classes = useStyles();

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
    return <div>Failed to load: {error.message}</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const houseEls = houses.map((h) => (
    <Grid key={h.ID} item xs>
      <Listing house={h} detailsUrl={`${match.url}/${h.ID}`} />
    </Grid>
  ));

  return (
    <div>
      <div className={classes.childNav}>
        <Button size="small" component={Link} to={`${match.url}/add`}>
          Add new
        </Button>
        <Button size="small" component={Link} to={`${match.url}/check`}>
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
