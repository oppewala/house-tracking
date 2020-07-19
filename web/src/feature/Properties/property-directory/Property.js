import React, { Component } from 'react';
import { Card, Typography } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  pageTitle: {
    margin: `${theme.spacing() * 5}px`,
  },
});

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
    // todo: style
    // eslint-disable-next-line no-unused-vars
    const { classes, house } = this.props;
    // console.log(classes, house);

    const address = this.BuildAddress(house);
    const houseLayout = this.BuildHouseLayout(house);
    const listingUrl = house.References[0].URL;

    const encodedAddress = encodeURIComponent(address);
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

    return (
      <Card>
        <CardContent>
          <Typography variant="h5">{address}</Typography>
          <p>{houseLayout}</p>
          <Score rawscore={house.RawScore} />
          <Tags tags={house.Tags} />
        </CardContent>
        <CardActions>
          <Button size="small" href={mapUrl}>
            Open in Maps
          </Button>
          <Button size="small" href={listingUrl}>
            See Listing
          </Button>
        </CardActions>
      </Card>
    );
  }
}

const Score = (props) => {
  const { rawscore } = props;

  return (
    <div>
      <p>
        Score:
        <br /> <pre>{JSON.stringify(rawscore, null, 2)}</pre>
      </p>
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

export default withStyles(styles)(Property);
