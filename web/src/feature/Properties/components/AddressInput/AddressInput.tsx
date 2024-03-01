/// <reference types='google.maps' />

import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import GoogleAutocomplete from './Autocomplete';
import { Address } from '../../types';

interface AddressError {
  message: string;
}

interface AddressInputProps {
  changeHandler(address?: Address): void;
  error: any;
}

export const AddressInput: FunctionComponent<AddressInputProps> = ({ changeHandler, error }) => {
  const autocompleteHandler = (placeId: string) => {
    if (!placeId || placeId === '') {
      changeHandler();
      return;
    }

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ placeId }, (results, status) => {
      if (status !== 'OK') {
        // eslint-disable-next-line
        console.error('Failed to retrieve place data');
        return;
      }

      if (!results || results.length === 0) {
        // eslint-disable-next-line
        console.error('Could not find matching place');
        return;
      }

      const place = results[0];

      const selectedAddress: Address = {
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

  return (
    <GoogleAutocomplete selectionHandler={autocompleteHandler} label="Address" error={error} />
  );
};

AddressInput.propTypes = {
  changeHandler: PropTypes.func.isRequired,
  error: PropTypes.any,
};
