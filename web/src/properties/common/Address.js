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
      <div className="py-2">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>
          <span className="input-label block">Address</span>
          <Autocomplete
            apiKey={`${process.env.REACT_APP_GOOGLE_APIKEY}`}
            onPlaceSelected={autocompleteHandler}
            types={['address']}
            componentRestrictions={{ country: 'au' }}
            className="input-plain focus:outline-none focus:shadow-outline"
          />
        </label>
      </div>
      <div className="py-2">
        <label htmlFor="Street">
          <span className="input-label block">Street</span>
          <input
            className="input-plain"
            disabled
            type="text"
            name="Street"
            placeholder="Waiting for search..."
            defaultValue={address.street}
          />
        </label>
      </div>
      <div className="flex flex-col -mx-2 md:flex-row md:flex-wrap">
        <SimpleAddressInput desc="Suburb" val={address.suburb} />
        <SimpleAddressInput desc="Postcode" val={address.postcode} />
        <SimpleAddressInput desc="State" val={address.state} />
      </div>
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
    <div className="w-full p-2 md:w-1/3">
      <label htmlFor={desc}>
        <span className="input-label block">{desc}</span>
      </label>
      <input
        className="input-plain"
        disabled
        type="text"
        name={desc}
        placeholder="Waiting for search..."
        defaultValue={val}
      />
    </div>
  );
};

export default Address;