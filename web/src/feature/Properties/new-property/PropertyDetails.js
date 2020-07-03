import React from 'react';

const PropertyDetails = (props) => {
  const { house, onPriceChange, onRoomChange, onExtraRoomsChecked } = props;

  return (
    <div>
      <SimpleInput desc="Price" name="price" val={house.price} changeHandler={onPriceChange} />
      <div className="flex flex-col py-2 space-y-2 sm:space-y-0 sm:space-x-2 sm:flex-row">
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
        <SimpleInput
          desc="Parking"
          name="parking"
          val={house.parking}
          changeHandler={onRoomChange}
        />
      </div>
      <div>
        <label htmlFor="extrarooms">
          <span className="input-label inline">Has Extra Rooms</span>
          <input
            className="ml-4"
            type="checkbox"
            checked={house.extrarooms}
            name="extrarooms"
            onChange={onExtraRoomsChecked}
          />
        </label>
      </div>
    </div>
  );
};

const SimpleInput = (props) => {
  const { name, desc, val, changeHandler } = props;

  return (
    <div className="w-full">
      <label htmlFor={name}>
        <span className="input-label block">{desc}</span>
        <input
          className="input-plain"
          type="text"
          id={name}
          name={name}
          value={val}
          onChange={changeHandler}
        />
      </label>
    </div>
  );
};

export default PropertyDetails;
