import React, { FunctionComponent, useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { Card, Typography } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import KingBedOutlinedIcon from '@material-ui/icons/KingBedOutlined';
import BathtubOutlinedIcon from '@material-ui/icons/BathtubOutlined';
import DriveEtaOutlinedIcon from '@material-ui/icons/DriveEtaOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import { DeleteProperty } from '../../../_services/ApiService/houseApi';
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
  const [deleting, setDeleting] = useState<boolean>(false);
  const history = useHistory();

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
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="rawdb-content"
            id={'rawdb-header-' + house.ID}
          >
            Raw DB information
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>
              <pre>{JSON.stringify(house, null, 2)}</pre>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </CardContent>
      <CardActions>
        <Button size="small" href={mapUrl} target="_blank">
          Open in Maps
        </Button>
        {listingUrl ? (
          <Button size="small" href={listingUrl} target="_blank">
            View Listing
          </Button>
        ) : null}
        <Button size="small" component={RouterLink} to={detailsUrl}>
          Details
        </Button>
        <Button
          size="small"
          onClick={() => {
            setDeleting(true);
            DeleteProperty(id).then(() => history.go(0));
          }}
          color="secondary"
          disabled={deleting}
        >
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
