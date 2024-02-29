import React from 'react';
import { config } from '@/_helpers/config';

const Nearby = (props) => {
  const { address } = props;

  const fetchUrl = new URL('/maps/api/place/nearbysearch/json', 'https://maps.googleapis.com');
  fetchUrl.searchParams.set('location', `${address.point.lat}%2C${address.point.lng}`);
  fetchUrl.searchParams.set('rankby', 'distance');
  fetchUrl.searchParams.set('type', 'train_station');
  fetchUrl.searchParams.set('key', config.GoogleApiKey);

  fetch(fetchUrl.toString()).then((r) => console.log(r));

  return (
    <div className="py-2">
      <h3 className="font-bold text-md">Nearby</h3>
      <div>
        <h4 className="font-bold">Stations</h4>
      </div>
      <div>
        <h4 className="font-bold">???</h4>
      </div>
    </div>
  );
};

export default Nearby;
