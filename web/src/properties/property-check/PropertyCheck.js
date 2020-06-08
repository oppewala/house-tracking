import React, { useEffect, useState } from 'react';
import Address from '../common/Address';

const PropertyCheck = () => {
  const [address, setAddress] = useState({
    street: '',
    suburb: '',
    state: '',
    postcode: '',
  });

  const [nbnInfo, setNbnInfo] = useState({});

  useEffect(() => {
    if (!address.street || address.street === '') return;
    setNbnInfo({ type: 'FTTP' });
  }, [address, setNbnInfo]);

  return (
    <div>
      <h2>Property Check</h2>
      <Address address={address} changeHandler={setAddress} />
      <div>Service Type: {JSON.stringify(nbnInfo)}</div>
    </div>
  );
};

export default PropertyCheck;
