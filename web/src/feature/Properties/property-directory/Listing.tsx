import React, { FunctionComponent, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { Card, Typography } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import KingBedOutlinedIcon from '@mui/icons-material/KingBedOutlined';
import BathtubOutlinedIcon from '@mui/icons-material/BathtubOutlined';
import DriveEtaOutlinedIcon from '@mui/icons-material/DriveEtaOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DeleteProperty } from '../../../_services/ApiService/houseApi';
import { Property as PropertyType } from '../../../_services/ApiService/types';

const PREFIX = 'Listing';

const classes = {
  pageTitle: `${PREFIX}-pageTitle`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.pageTitle}`]: {
    margin: `${theme.spacing() * 5}px`,
  }
}));

interface Props {
  house: PropertyType;
  detailsUrl: string;
}

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
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="rawdb-content"
            id={'rawdb-header-' + house.ID}
          >
            Raw DB information
          </AccordionSummary>
          <AccordionDetails>
            <Root>
              <pre>{JSON.stringify(house, null, 2)}</pre>
            </Root>
          </AccordionDetails>
        </Accordion>
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

export default (Listing);
