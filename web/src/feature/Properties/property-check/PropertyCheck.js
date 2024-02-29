import React, { useState } from 'react';
import { AddressInput } from 'feature/Properties/components/AddressInput';
import NbnDetails from './NbnDetails';
import Nearby from './Nearby';
import { config } from '@/_helpers/config';

const PropertyCheck = () => {
  const [address, setAddress] = useState({
    placeId: '',
    street: '',
    suburb: '',
    state: '',
    postcode: '',
    point: { lat: 0, lng: 0 },
  });

  const onAutoComplete = async (autoRes) => {
    if (!autoRes) return;

    setAddress(autoRes);
  };

  const mapQuery = encodeURIComponent(`${address.street} ${address.suburb}`);
  const mapLink = `https://www.google.com/maps/search/
  ?api=1&query=${mapQuery}&query_place_id=${address.placeId}`;
  const embeddedMap = !address.placeId
    ? ''
    : // eslint-disable-next-line max-len
      `https://www.google.com/maps/embed/v1/place?q=place_id:${address.placeId}&key=${config.GoogleApiKey}`;

  return (
    <section className="w-full">
      <h2 className="font-bold text-lg">Property Check</h2>
      <AddressInput address={address} changeHandler={onAutoComplete} />
      <div hidden={!address.placeId}>
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
      <Nearby address={address} />
      <NbnDetails address={address} />
    </section>
  );
};

export default PropertyCheck;
