import React from 'react';

interface Props {
  score: any;
  sliderChangeHandler: any;
}

export const ScoreInput: React.FC<Props> = ({ score, sliderChangeHandler }) => {

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
    </div>
  );
};

interface SliderProps {
  score: any; 
  name: string; 
  desc: string;
  changeHandler: any;
}

const Slider: React.FC<SliderProps> = ({ score, name, desc, changeHandler }) => {
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
