import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from 'react-google-autocomplete';

const Address = (props) => {
  const { address, changeHandler } = props;

  const autocompleteHandler = (place) => {
    const selectedAddress = {
      street: '',
      suburb: '',
      postcode: '',
      state: '',
    };

    const streetParts = {
      number: '',
      street: '',
    };
    place.address_components.forEach((c) => {
      const [type] = c.types;
      switch (type) {
        case 'street_number':
          streetParts.number = c.short_name;
          break;
        case 'route':
          streetParts.street = c.short_name;
          break;
        case 'locality':
          selectedAddress.suburb = c.short_name;
          break;
        case 'postal_code':
          selectedAddress.postcode = c.short_name;
          break;
        case 'administrative_area_level_1':
          selectedAddress.state = c.short_name;
          break;
        default:
          break;
      }
      if (type === 'route') {
        streetParts.street = c.short_name;
      }
    });

    selectedAddress.street = `${streetParts.number} ${streetParts.street}`;

    changeHandler(selectedAddress);
  };

  return (
    <div>
      <Autocomplete
        apiKey={`${process.env.REACT_APP_GOOGLE_APIKEY}`}
        onPlaceSelected={autocompleteHandler}
        types={['address']}
        componentRestrictions={{ country: 'au' }}
      />
      <SimpleAddressInput desc="Street" val={address.street} />
      <SimpleAddressInput desc="Suburb" val={address.suburb} />
      <SimpleAddressInput desc="Postcode" val={address.postcode} />
      <SimpleAddressInput desc="State" val={address.state} />
    </div>
  );
};

Address.propTypes = {
  address: PropTypes.shape().isRequired,
  changeHandler: PropTypes.func.isRequired,
};

const SimpleAddressInput = (props) => {
  const { desc, val } = props;

  return (
    <div>
      <label htmlFor={desc}>{desc}</label>
      <input disabled type="text" name={desc} defaultValue={val} />
    </div>
  );
};

export default Address;
