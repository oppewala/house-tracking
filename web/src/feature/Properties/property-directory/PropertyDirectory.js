import React, { useEffect, useState } from 'react';
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

  const houseEls = houses.map((h) => <Property key={h.ID} house={h} />);

  return (
    <div className="property-directory">
      <h3 className="header header-xl">Properties</h3>
      <div className="properties">{houseEls}</div>
    </div>
  );
};

export default PropertyDirectory;
