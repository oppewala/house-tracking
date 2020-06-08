import React, { useEffect, useState } from 'react';
import PropertyDirectory from './property-directory/PropertyDirectory';
import NewProperty from './new-property/NewProperty';

const Properties = () => {
  const [isLoaded, setLoaded] = useState(false);
  const [houses, setHouses] = useState();
  const [error, setError] = useState();

  async function fetchData() {
    const res = await fetch('https://api.house.crackedjar.com');

    await res
      .json()
      .then((r) => setHouses(r))
      .catch((e) => setError(e));

    setLoaded(true);
  }

  useEffect(() => {
    fetchData();
  });

  if (error) {
    return <div>Failed to load: {error.message}</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>House List</h2>
      <PropertyDirectory houses={houses} />
      <NewProperty />
    </div>
  );
};

export default Properties;
