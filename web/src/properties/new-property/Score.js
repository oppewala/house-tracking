import React from 'react';

export const ScoreInput = (props) => {
  const { score, sliderChangeHandler, checkboxChangeHandler } = props;

  return (
    <div>
      <Slider desc="Quality" name="quality" score={score} changeHandler={sliderChangeHandler} />
      <Slider desc="Safety" name="safety" score={score} changeHandler={sliderChangeHandler} />
      <Slider
        desc="Outdoor Area"
        name="outdoorarea"
        score={score}
        changeHandler={sliderChangeHandler}
      />
      <Slider
        desc="Public Transport"
        name="publictransport"
        score={score}
        changeHandler={sliderChangeHandler}
      />
      <Slider desc="Bedrooms" name="bedrooms" score={score} changeHandler={sliderChangeHandler} />
      <Slider desc="Bathrooms" name="bathrooms" score={score} changeHandler={sliderChangeHandler} />
      <Slider desc="Kitchen" name="kitchen" score={score} changeHandler={sliderChangeHandler} />
      <Slider
        desc="Living Area"
        name="livingarea"
        score={score}
        changeHandler={sliderChangeHandler}
      />
      <Slider desc="Locale" name="localarea" score={score} changeHandler={sliderChangeHandler} />
      <Slider desc="NBN" name="nbn" score={score} changeHandler={sliderChangeHandler} />
      <div>
        <label htmlFor="extrarooms">
          Has Extra Rooms
          <input
            type="checkbox"
            checked={score.extrarooms}
            name="extrarooms"
            onChange={checkboxChangeHandler}
          />
        </label>
      </div>
    </div>
  );
};

const Slider = (props) => {
  const { score, name, desc, changeHandler } = props;
  const value = score[name];

  return (
    <div>
      <label htmlFor={name}>
        {desc}
        <input
          type="range"
          min="1"
          max="5"
          step="1"
          id={name}
          name={name}
          value={value}
          onChange={changeHandler}
        />
      </label>
      ({value})
    </div>
  );
};

export default ScoreInput;
