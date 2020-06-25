import React from 'react';

const Nearby = (props) => {
  const { address } = props;

  const formattedLocation = `location=${address.point.lat}%2C${address.point.lng}`;
  const fetchUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json
    ?${formattedLocation}
    &rankby=distance
    &type=train_station
    &key=${process.env.REACT_APP_GOOGLE_APIKEY}`;

  fetch(fetchUrl).then((r) => console.log(r));

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
