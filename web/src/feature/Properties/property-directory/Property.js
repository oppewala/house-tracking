import React, { Component } from 'react';

export class Property extends Component {
  BuildAddress = (property) => {
    const addressParts = [
      property.Address.Street,
      property.Address.Suburb,
      property.Address.Postcode,
      property.Address.State,
    ];
    return addressParts.join(', ');
  };

  BuildHouseLayout = (house) => {
    const houseLayoutParts = [
      `Bedrooms: ${house.Bedrooms}`,
      `Bathrooms: ${house.Bathrooms}`,
      `Parking: ${house.Parking}`,
    ];
    return houseLayoutParts.join(' | ');
  };

  render() {
    const { house } = this.props;

    const address = this.BuildAddress(house);
    const houseLayout = this.BuildHouseLayout(house);
    const listingUrl = house.References[0].URL;

    const encodedAddress = encodeURIComponent(address);
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

    return (
      <div className="property py-2">
        <h4 className="header">{address}</h4>
        <p>{houseLayout}</p>
        <Score rawscore={house.RawScore} />
        <Tags tags={house.Tags} />
        <p className="flex space-x-4">
          <a href={mapUrl} className="link">
            Open in Maps
          </a>{' '}
          <a href={listingUrl} className="link">
            See Listing
          </a>
        </p>
      </div>
    );
  }
}

const Score = (props) => {
  const { rawscore } = props;

  return (
    <div>
      <p>Score: {JSON.stringify(rawscore)}</p>
    </div>
  );
};

const Tags = (props) => {
  const { tags } = props;
  const tagEls = tags.map((t) => <li key={t}>{t}</li>);

  return (
    <div>
      <p>Tags</p>
      <ul>{tagEls}</ul>
    </div>
  );
};

export default Property;
