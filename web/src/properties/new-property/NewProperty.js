import React, {Component} from "react";
import {Address} from "./Address";
import {ScoreInput} from "./Score";

class NewProperty extends Component {
    state = {
        house: {
            address: {
                street: '',
                suburb: '',
                postcode: '',
                state: ''
            },
            bathrooms: 0,
            bedrooms: 0,
            parking: 0,
            price: '',
            rawscore: {
                bathrooms:0,
                bedrooms:0,
                extrarooms:false,
                kitchen:0,
                livingarea:0,
                localarea:0,
                nbn:0,
                outdoorarea:0,
                publictransport:0,
                quality:0,
                safety:0
            },
            references: [{
                    source:"Domain",
                    url:"https://www.domain.com.au/37-camera-walk-coburg-north-vic-3058-2016127139"
            }],
            tags: ["omg","nice"]
        }
    }

    scoreFieldChangeHandler = (e) => {
        let house = this.state.house;
        house.rawscore[e.target.name] = e.target.value;

        console.log('score', e.target.name, e.target.value, house)

        this.setState({
            house: house
        })
    }

    addressFieldChangeHandler = (e) => {
        let house = this.state.house;
        house.address[e.target.name] = e.target.value;

        this.setState({
            house: house
        })
    }

    baseFieldChangeHandler = (e) => {
        let house = this.state.house;
        house[e.target.name] = e.target.value;

        this.setState({
            house: house
        })
    }

    render() {
        const {house} = this.state

        return (
            <div>
                <h3>Add new property</h3>
                <Address changeHandler={this.addressFieldChangeHandler} address={house.address} />
                <p>Stuff</p>
                <SimpleInput desc='Price' name='price' val={house.price} changeHandler={this.baseFieldChangeHandler} />
                <SimpleInput desc='Bedrooms' name='bedrooms' val={house.bedrooms} changeHandler={this.baseFieldChangeHandler} />
                <SimpleInput desc='Bathrooms' name='bathrooms' val={house.bathrooms} changeHandler={this.baseFieldChangeHandler} />
                <SimpleInput desc='Parking' name='parking' val={house.parking} changeHandler={this.baseFieldChangeHandler} />
                <ScoreInput score={house.rawscore} changeHandler={this.scoreFieldChangeHandler} />
            </div>
        )
    }
}

const SimpleInput = (props) => {
    return (<div>
        <label htmlFor={props.name}>{props.desc}</label>
        <input type='text' id={props.name} name={props.name} value={props.val} onChange={props.changeHandler} />
    </div>);
}

export default NewProperty;