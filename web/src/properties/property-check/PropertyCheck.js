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
    <div>
      <h2>Property Check</h2>
      <Address address={address} changeHandler={setAddress} />
      <NbnDetails address={address} />
    </div>
  );
};

export default PropertyCheck;
