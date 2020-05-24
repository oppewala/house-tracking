import React from 'react';
import PropTypes from 'prop-types';
import { Property } from './Property';
import { HouseType } from '../House';

const PropertyDirectory = (props) => {
  const { houses } = props;
  const houseEls = houses.map((h) => <Property key={h.ID} house={h} />);

  return <div>{houseEls}</div>;
};

PropertyDirectory.propTypes = {
  houses: PropTypes.arrayOf(HouseType.isRequired),
};

PropertyDirectory.defaultProps = {
  houses: [],
};

export default PropertyDirectory;
