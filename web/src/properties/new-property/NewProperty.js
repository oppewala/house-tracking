import React, { Component } from 'react';
import Address from './Address';
import { ScoreInput } from './Score';

class NewProperty extends Component {
  constructor() {
    super();

    this.state = {
      house: {
        address: {
          street: '',
          suburb: '',
          postcode: '',
          state: '',
        },
        bathrooms: 0,
        bedrooms: 0,
        parking: 0,
        price: '',
        rawscore: {
          bathrooms: 0,
          bedrooms: 0,
          extrarooms: false,
          kitchen: 0,
          livingarea: 0,
          localarea: 0,
          nbn: 0,
          outdoorarea: 0,
          publictransport: 0,
          quality: 0,
          safety: 0,
        },
        references: [
          {
            source: 'Domain',
            url: 'https://www.domain.com.au/37-camera-walk-coburg-north-vic-3058-2016127139',
          },
        ],
        tags: ['omg', 'nice'],
      },
    };
  }

  scoreFieldChangeHandler = (e) => {
    const { house } = this.state;
    house.rawscore[e.target.name] = e.target.value;

    this.setState({
      house,
    });
  };

  addressFieldChangeHandler = (address) => {
    const { house } = this.state;
    house.address = address;

    this.setState({
      house,
    });
  };

  baseFieldChangeHandler = (e) => {
    const { house } = this.state;
    house[e.target.name] = e.target.value;

    this.setState({
      house,
    });
  };

  render() {
    const { house } = this.state;

    return (
      <div>
        <h3>Add new property</h3>
        <Address changeHandler={this.addressFieldChangeHandler} address={house.address} />
        <p>Stuff</p>
        <SimpleInput
          desc="Price"
          name="price"
          val={house.price}
          changeHandler={this.baseFieldChangeHandler}
        />
        <SimpleInput
          desc="Bedrooms"
          name="bedrooms"
          val={house.bedrooms}
          changeHandler={this.baseFieldChangeHandler}
        />
        <SimpleInput
          desc="Bathrooms"
          name="bathrooms"
          val={house.bathrooms}
          changeHandler={this.baseFieldChangeHandler}
        />
        <SimpleInput
          desc="Parking"
          name="parking"
          val={house.parking}
          changeHandler={this.baseFieldChangeHandler}
        />
        <ScoreInput score={house.rawscore} changeHandler={this.scoreFieldChangeHandler} />
      </div>
    );
  }
}

const SimpleInput = (props) => {
  const { name, desc, val, changeHandler } = props;

  return (
    <div>
      <label htmlFor={name}>{desc}</label>
      <input type="text" id={name} name={name} value={val} onChange={changeHandler} />
    </div>
  );
};

export default NewProperty;
