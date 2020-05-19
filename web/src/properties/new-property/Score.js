import React from "react";

export const ScoreInput = (props) => {
    return (<div>
        <p>Score</p>
        <ScoreSlider desc='Quality' name='quality' score={props.score} changeHandler={props.changeHandler}/>
        <ScoreSlider desc='Safety' name='safety' score={props.score} changeHandler={props.changeHandler}/>
        <ScoreSlider desc='Outdoor Area' name='outdoorarea' score={props.score} changeHandler={props.changeHandler}/>
        <ScoreSlider desc='Public Transport' name='publictransport' score={props.score}
                     changeHandler={props.changeHandler}/>
        <ScoreSlider desc='Bedrooms' name='bedrooms' score={props.score} changeHandler={props.changeHandler}/>
        <ScoreSlider desc='Bathrooms' name='bathrooms' score={props.score} changeHandler={props.changeHandler}/>
        <ScoreSlider desc='Kitchen' name='kitchen' score={props.score} changeHandler={props.changeHandler}/>
        <ScoreSlider desc='Living Area' name='livingarea' score={props.score} changeHandler={props.changeHandler}/>
        <ScoreSlider desc='Locale' name='localarea' score={props.score} changeHandler={props.changeHandler}/>
        <ScoreSlider desc='NBN' name='nbn' score={props.score} changeHandler={props.changeHandler}/>
        This should be checkbox
        <ScoreSlider desc='Has Extra Rooms' name='extrarooms' score={props.score} changeHandler={props.changeHandler}/>
    </div>)
}

const ScoreSlider = (props) => {
    const value = props.score[props.name];

    return <div>
        <label htmlFor={props.name}>{props.desc}</label>
        <input type='range' min='0' max='5' step='1' id={props.name} name={props.name} value={value}
               onChange={props.changeHandler}/> ({value})
    </div>
}