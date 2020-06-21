import React, { useState } from 'react';
import Address from '../common/Address';
import NbnDetails from './NbnDetails';
import Nearby from './Nearby';

const PropertyCheck = () => {
  const [address, setAddress] = useState({
    street: '',
    suburb: '',
    state: '',
    postcode: '',
  });
  const [placeId, setPlaceId] = useState('');

  const onAutoComplete = (autoRes) => {
    setAddress(autoRes);
    setPlaceId(autoRes.placeId);
  };

  const mapQuery = encodeURIComponent(`${address.street} ${address.suburb}`);
  const mapLink = `https://www.google.com/maps/search/
  ?api=1&query=${mapQuery}&query_place_id=${placeId}`;
  const embeddedMap = !placeId
    ? ''
    : // eslint-disable-next-line max-len
      `https://www.google.com/maps/embed/v1/place?q=place_id:${placeId}&key=${process.env.REACT_APP_GOOGLE_APIKEY}`;

  return (
    <section className="w-full">
      <h2 className="font-bold text-lg">Property Check</h2>
      <Address address={address} changeHandler={onAutoComplete} />
      <div hidden={!placeId}>
        <iframe
          title="Property Map"
          width="100%"
          height="450"
          frameBorder="0"
          style={{ border: 0 }}
          src={embeddedMap}
          allowFullScreen
        />
        <a href={mapLink} className="cursor-pointer block text-purple-400 hover:text-purple-700">
          View in Google Maps
        </a>
      </div>
      <Nearby />
      <NbnDetails address={address} />
    </section>
  );
};

export default PropertyCheck;
