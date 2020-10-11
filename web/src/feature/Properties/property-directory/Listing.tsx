import React, { FunctionComponent } from 'react';
import { Card, Typography } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { DeleteProperty } from '../../../_services/ApiService/houseApi';
import { Link as RouterLink } from 'react-router-dom';
import KingBedOutlinedIcon from '@material-ui/icons/KingBedOutlined';
import BathtubOutlinedIcon from '@material-ui/icons/BathtubOutlined';
import DriveEtaOutlinedIcon from '@material-ui/icons/DriveEtaOutlined';
import { Property as PropertyType } from '../../../_services/ApiService/types';

interface Props {
  house: PropertyType;
  detailsUrl: string;
}

// todo: style
const styles = (theme) => ({
  pageTitle: {
    margin: `${theme.spacing() * 5}px`,
  },
});

export const Listing: FunctionComponent<Props> = ({ house, detailsUrl }) => {
  const id: string = house.ID ?? '';

  const buildAddress = (property: PropertyType) => {
    const addressParts = [
      property.Address.Street,
      property.Address.Suburb,
      property.Address.Postcode,
      property.Address.State,
    ];
    return addressParts.join(', ');
  };

  const HouseLayout: React.FC<{ house: PropertyType }> = ({ house }) => {
    return (
      <p>
        <KingBedOutlinedIcon fontSize={'inherit'} /> Bedrooms: {house?.Layout?.Bedrooms} |{' '}
        <BathtubOutlinedIcon fontSize={'inherit'} /> Bathrooms: {house?.Layout?.Bathrooms} |{' '}
        <DriveEtaOutlinedIcon fontSize={'inherit'} /> Parking: {house?.Layout?.Parking}
      </p>
    );
  };

  const address = buildAddress(house);

  const listingUrl = house.References?.[0].Value;
  console.log(house.References, listingUrl);

  const encodedAddress = encodeURIComponent(address);
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{address}</Typography>
        <HouseLayout house={house} />

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
        <Button size="small" component={RouterLink} to={detailsUrl}>
          Details
        </Button>
        <Button size="small" onClick={() => DeleteProperty(id)} color="secondary">
          Delete
        </Button>
      </CardActions>
    </Card>
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

export default withStyles(styles)(Listing);
