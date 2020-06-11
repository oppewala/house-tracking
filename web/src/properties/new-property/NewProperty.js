import React, { Component } from 'react';
import Address from '../common/Address';
import { ScoreInput } from './Score';
import PropertyDetails from './PropertyDetails';
import References from './References';

class NewProperty extends Component {
  constructor() {
    super();

    const initScore = {
      bathrooms: 1,
      bedrooms: 1,
      extrarooms: false,
      kitchen: 1,
      livingarea: 1,
      localarea: 1,
      nbn: 1,
      outdoorarea: 1,
      publictransport: 1,
      quality: 1,
      safety: 1,
    };

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
        rawscore: initScore,
        references: [
          {
            source: 'Domain',
            url: 'https://www.domain.com.au/37-camera-walk-coburg-north-vic-3058-2016127139',
          },
          {
            source: 'Realestate',
            url: 'https://www.realestate.com.au/property-townhouse-vic-reservoir-133380590',
          },
        ],
        tags: ['omg', 'nice'],
      },
    };
  }

  scoreSliderChangeHandler = (e) => {
    const { house } = this.state;
    house.rawscore[e.currentTarget.name] = Number(e.currentTarget.value);

    this.setState({
      house,
    });
  };

  scoreCheckboxChangeHandler = (e) => {
    const { house } = this.state;
    house.rawscore[e.currentTarget.name] = e.currentTarget.checked;

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

  onPriceChange = (e) => {
    const { house } = this.state;
    house[e.currentTarget.name] = e.currentTarget.value;

    this.setState({
      house,
    });
  };

  onRoomChange = (e) => {
    const { house } = this.state;
    house[e.currentTarget.name] = Number(e.currentTarget.value);

    this.setState({
      house,
    });
  };

  addReferenceHandler = (source, url) => {
    const { house } = this.state;
    house.references.push({
      source,
      url,
    });

    this.setState({
      house,
    });
  };

  deleteReferenceHandler = (source) => {
    const { house } = this.state;

    house.references = house.references.filter((r) => r.source !== source);

    this.setState({
      house,
    });
  };

  submitForm = (e) => {
    e.preventDefault();

    const { house } = this.state;

    fetch('https://api.house.crackedjar.com/house', {
      method: 'POST',
      body: JSON.stringify(house),
    })
      .then((r) => console.log('Success', r))
      .catch((ex) => console.error('Failed', ex));
  };

  render() {
    const { house } = this.state;

    return (
      <div>
        <h3>Add new property</h3>
        <form>
          <h4>Address</h4>
          <Address changeHandler={this.addressFieldChangeHandler} address={house.address} />
          <h4>Property Details</h4>
          <PropertyDetails
            house={house}
            onPriceChange={this.onPriceChange}
            onRoomChange={this.onRoomChange}
          />
          <h4>Score</h4>
          <ScoreInput
            score={house.rawscore}
            sliderChangeHandler={this.scoreSliderChangeHandler}
            checkboxChangeHandler={this.scoreCheckboxChangeHandler}
          />
          <h4>Links</h4>
          <References
            references={house.references}
            addHandler={this.addReferenceHandler}
            deleteHandler={this.deleteReferenceHandler}
          />
        </form>
        <br />
        <button type="submit" onClick={this.submitForm}>
          Submit
        </button>
      </div>
    );
  }
}

export default NewProperty;
