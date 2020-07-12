import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { Link, useRouteMatch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Property } from './Property';

const useStyles = makeStyles((theme) => ({
  directoryContainer: {
    marginTop: 0,
  },
  childNav: {
    margin: `${theme.spacing() * 2}px 0 0 0`,
  },
}));

const PropertyDirectory = () => {
  const [isLoaded, setLoaded] = useState(false);
  const [houses, setHouses] = useState();
  const [error, setError] = useState();

  const controller = new AbortController();
  const { signal } = controller;
  const match = useRouteMatch();
  const classes = useStyles();

  useEffect(() => {
    fetch('https://api.house.crackedjar.com', { signal })
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
      <Property house={h} />
    </Grid>
  ));

  const smallButton = React.forwardRef((props) => (
    <Button size="small" href={props.href}>
      {props.children}
    </Button>
  ));

  return (
    <div>
      <div className={classes.childNav}>
        <Link to={`${match.url}/add`} component={smallButton}>
          Add new
        </Link>
        <Link to={`${match.url}/check`} component={smallButton}>
          Check Existing
        </Link>
      </div>
      <Grid container spacing={5} direction="column" className={classes.directoryContainer}>
        {houseEls}
      </Grid>
    </div>
  );
};

export default PropertyDirectory;
