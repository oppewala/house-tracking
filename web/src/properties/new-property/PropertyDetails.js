import React from 'react';

const PropertyDetails = (props) => {
  const { house, onPriceChange, onRoomChange } = props;

  return (
    <div>
      <SimpleInput desc="Price" name="price" val={house.price} changeHandler={onPriceChange} />
      <SimpleInput
        desc="Bedrooms"
        name="bedrooms"
        val={house.bedrooms}
        changeHandler={onRoomChange}
      />
      <SimpleInput
        desc="Bathrooms"
        name="bathrooms"
        val={house.bathrooms}
        changeHandler={onRoomChange}
      />
      <SimpleInput desc="Parking" name="parking" val={house.parking} changeHandler={onRoomChange} />
    </div>
  );
};

const SimpleInput = (props) => {
  const { name, desc, val, changeHandler } = props;

  return (
    <div>
      <label htmlFor={name}>{desc}</label>
      <input type="text" id={name} name={name} value={val} onChange={changeHandler} />
    </div>
  );
};

export default PropertyDetails;
