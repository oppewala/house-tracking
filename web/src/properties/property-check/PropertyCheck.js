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

  return (
    <section className="container w-full">
      <h2 className="font-bold text-lg">Property Check</h2>
      <Address address={address} changeHandler={setAddress} />
      <NbnDetails address={address} />
    </section>
  );
};

export default PropertyCheck;
