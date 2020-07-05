import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Property } from './Property';

const PropertyDirectory = () => {
  const [isLoaded, setLoaded] = useState(false);
  const [houses, setHouses] = useState();
  const [error, setError] = useState();

  const controller = new AbortController();
  const { signal } = controller;

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
    <Grid item>
      <Property key={h.ID} house={h} />
    </Grid>
  ));

  return (
    <div>
      <Typography variant="h3">Properties</Typography>
      <Grid container spacing={5} direction="column" className="properties">
        {houseEls}
      </Grid>
    </div>
  );
};

export default PropertyDirectory;
