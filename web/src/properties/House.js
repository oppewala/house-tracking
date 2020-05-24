import PropTypes from 'prop-types';

export const AddressType = PropTypes.shape({
  street: PropTypes.string,
  suburb: PropTypes.string,
  postcode: PropTypes.string,
  state: PropTypes.string,
});

export const RawScoreType = PropTypes.shape({
  bathrooms: PropTypes.number,
  bedrooms: PropTypes.number,
  extrarooms: PropTypes.bool,
  kitchen: PropTypes.number,
  livingarea: PropTypes.number,
  localarea: PropTypes.number,
  nbn: PropTypes.number,
  outdoorarea: PropTypes.number,
  publictransport: PropTypes.number,
  quality: PropTypes.number,
  safety: PropTypes.number,
});

export const PropertyReferenceType = PropTypes.shape({
  source: PropTypes.string,
  url: PropTypes.string,
});

export const HouseType = PropTypes.shape({
  address: AddressType,
  bathrooms: PropTypes.number,
  bedrooms: PropTypes.number,
  parking: PropTypes.number,
  price: PropTypes.string,
  rawscore: RawScoreType,
  references: PropTypes.arrayOf(PropertyReferenceType),
  tags: PropTypes.arrayOf(PropTypes.string),
});

export default HouseType;
