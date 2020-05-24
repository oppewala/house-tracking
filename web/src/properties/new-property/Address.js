import React from 'react';
import PropTypes from 'prop-types';

const Address = (props) => {
  const { address, changeHandler } = props;

  return (
    <div>
      <p>Address</p>
      <SimpleAddressInput
        desc="Street"
        name="street"
        val={address.street}
        changeHandler={changeHandler}
      />
      <SimpleAddressInput
        desc="Suburb"
        name="suburb"
        val={address.suburb}
        changeHandler={changeHandler}
      />
      <SimpleAddressInput
        desc="Postcode"
        name="postcode"
        val={address.postcode}
        changeHandler={changeHandler}
      />
      <SimpleAddressInput
        desc="State"
        name="state"
        val={address.state}
        changeHandler={changeHandler}
      />
    </div>
  );
};

Address.propTypes = {
  address: PropTypes.shape().isRequired,
  changeHandler: PropTypes.func.isRequired,
};

const SimpleAddressInput = (props) => {
  const { name, desc, val, changeHandler } = props;
  const id = `address $name`;

  return (
    <div>
      <label htmlFor={name}>{desc}</label>
      <input type="text" id={id} name={name} value={val} onChange={changeHandler} />
    </div>
  );
};

export default Address;
