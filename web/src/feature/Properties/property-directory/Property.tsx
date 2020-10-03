import React, { FunctionComponent } from 'react';
import { Card, Typography } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { DeleteProperty } from '../../../_services/ApiService/houseApi';

interface Props {
  house: any;
}

// todo: style
const styles = (theme) => ({
  pageTitle: {
    margin: `${theme.spacing() * 5}px`,
  },
});

export const Property: FunctionComponent<Props> = ({ house }) => {
  const buildAddress = (property: any) => {
    const addressParts = [
      property.Address.Street,
      property.Address.Suburb,
      property.Address.Postcode,
      property.Address.State,
    ];
    return addressParts.join(', ');
  };

  const buildHouseLayout = (house: any) => {
    const houseLayoutParts = [
      `Bedrooms: ${house.Bedrooms}`,
      `Bathrooms: ${house.Bathrooms}`,
      `Parking: ${house.Parking}`,
    ];
    return houseLayoutParts.join(' | ');
  };

  const address = buildAddress(house);
  const houseLayout = buildHouseLayout(house);

  const listingUrl = house.References?.[0].URL;
  console.log(house.References, listingUrl);

  const encodedAddress = encodeURIComponent(address);
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{address}</Typography>
        <p>{houseLayout}</p>
        <Score rawscore={house.RawScore} />
        <Tags tags={house.Tags} />
        <div>
          <pre>{JSON.stringify(house, null, 2)}</pre>
        </div>
      </CardContent>
      <CardActions>
        <Button size="small" href={mapUrl}>
          Open in Maps
        </Button>
        {listingUrl ? (
          <Button size="small" href={listingUrl}>
            See Listing
          </Button>
        ) : null}
        <Button size="small" onClick={() => DeleteProperty(house.ID)} color="secondary">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

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
  const tagEls = tags?.map((t) => <li key={t}>{t}</li>);

  return (
    <div>
      <p>Tags</p>
      <ul>{tagEls}</ul>
    </div>
  );
};

export default withStyles(styles)(Property);
