import React, { useState } from 'react';
import Address from '../common/Address';
import NbnDetails from './NbnDetails';

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

  return (
    <section className="w-full">
      <h2 className="font-bold text-lg">Property Check</h2>
      <Address address={address} changeHandler={onAutoComplete} />
      <div hidden={!placeId} className="cursor-pointer">
        <a href={mapLink}>Google Maps</a>
      </div>
      <NbnDetails address={address} />
    </section>
  );
};

export default PropertyCheck;
