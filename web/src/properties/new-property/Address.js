import React from "react";

export const Address = (props) => {
    return (<div>
        <p>Address</p>
        <SimpleAddressInput desc='Street' name='street' val={props.address.street} changeHandler={props.changeHandler}/>
        <SimpleAddressInput desc='Suburb' name='suburb' val={props.address.suburb} changeHandler={props.changeHandler}/>
        <SimpleAddressInput desc='Postcode' name='postcode' val={props.address.postcode}
                            changeHandler={props.changeHandler}/>
        <SimpleAddressInput desc='State' name='state' val={props.address.state} changeHandler={props.changeHandler}/>
    </div>)
}
const SimpleAddressInput = (props) => {
    return (<div>
        <label htmlFor={props.name}>{props.desc}</label>
        <input type='text' id={'address' + props.name} name={props.name} value={props.val}
               onChange={props.changeHandler}/>
    </div>);
}