import React from 'react';

export const ScoreInput = (props) => {
  const { score, changeHandler } = props;

  return (
    <div>
      <p>Score</p>
      <ScoreSlider desc="Quality" name="quality" score={score} changeHandler={changeHandler} />
      <ScoreSlider desc="Safety" name="safety" score={score} changeHandler={changeHandler} />
      <ScoreSlider
        desc="Outdoor Area"
        name="outdoorarea"
        score={score}
        changeHandler={changeHandler}
      />
      <ScoreSlider
        desc="Public Transport"
        name="publictransport"
        score={score}
        changeHandler={changeHandler}
      />
      <ScoreSlider desc="Bedrooms" name="bedrooms" score={score} changeHandler={changeHandler} />
      <ScoreSlider desc="Bathrooms" name="bathrooms" score={score} changeHandler={changeHandler} />
      <ScoreSlider desc="Kitchen" name="kitchen" score={score} changeHandler={changeHandler} />
      <ScoreSlider
        desc="Living Area"
        name="livingarea"
        score={score}
        changeHandler={changeHandler}
      />
      <ScoreSlider desc="Locale" name="localarea" score={score} changeHandler={changeHandler} />
      <ScoreSlider desc="NBN" name="nbn" score={score} changeHandler={changeHandler} />
      This should be checkbox
      <ScoreSlider
        desc="Has Extra Rooms"
        name="extrarooms"
        score={score}
        changeHandler={changeHandler}
      />
    </div>
  );
};

const ScoreSlider = (props) => {
  const { score, name, desc, changeHandler } = props;
  const value = score[name];

  return (
    <div>
      <label htmlFor={name}>{desc}</label>
      <input
        type="range"
        min="0"
        max="5"
        step="1"
        id={name}
        name={name}
        value={value}
        onChange={changeHandler}
      />
      ({value})
    </div>
  );
};

export default ScoreInput;
