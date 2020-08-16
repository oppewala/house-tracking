import React from 'react';
import PropTypes from 'prop-types';
import GoogleAutocomplete from './Autocomplete';

const Address = (props) => {
  const { address, changeHandler } = props;

  const autocompleteHandler = (placeId) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ placeId }, (results, status) => {
      if (status !== 'OK') {
        // eslint-disable-next-line
        console.error('Failed to retrieve place data');
        return;
      }

      if (results.length === 0) {
        // eslint-disable-next-line
        console.error('Could not find matching place');
        return;
      }

      const place = results[0];

      const selectedAddress = {
        placeId: place.place_id,
        street: '',
        suburb: '',
        postcode: '',
        state: '',
        point: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        },
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
    });
  };

  const enableDebug = false;

  return (
    <>
      <GoogleAutocomplete selectionHandler={autocompleteHandler} label="Address" />
      {enableDebug ? <DebugAddress address={address} /> : null}
    </>
  );
};

Address.propTypes = {
  address: PropTypes.shape().isRequired,
  changeHandler: PropTypes.func.isRequired,
};

const DebugAddress = (props) => {
  const { address } = props;

  return (
    <>
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
      <div className="flex flex-col space-x-0 space-y-2 md:space-x-2 md:flex-row md:space-y-0">
        <SimpleAddressInput desc="Suburb" val={address.suburb} />
        <SimpleAddressInput desc="Postcode" val={address.postcode} />
        <SimpleAddressInput desc="State" val={address.state} />
      </div>
    </>
  );
};

const SimpleAddressInput = (props) => {
  const { desc, val } = props;

  return (
    <div className="w-full">
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
