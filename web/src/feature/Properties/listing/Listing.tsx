import React, { FunctionComponent, useEffect, useState } from 'react';
import { RetrieveProperty } from '../../../_services/ApiService/houseApi';
import {
  Card,
  CardContent,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core';
import { BreadcrumbNav } from '../components/Breadcrumb/BreadcrumbNav';
import { Property } from '../../../_services/ApiService/types';
import KingBedOutlinedIcon from '@material-ui/icons/KingBedOutlined';
import BathtubOutlinedIcon from '@material-ui/icons/BathtubOutlined';
import DriveEtaOutlinedIcon from '@material-ui/icons/DriveEtaOutlined';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { MapEmbed } from '../components/MapEmbed';

interface Props {
  id: string;
}

const useStyles = makeStyles((theme) => ({
  mapCard: {
    height: '100%',
  },
  mapCardContent: {
    height: '100%',
  },
}));

export const Listing: FunctionComponent<Props> = ({ id }) => {
  const classes = useStyles();
  const [apiState, setApiState] = useState<string>('loading');
  const [property, setProperty] = useState<Property>();
  useEffect(() => {
    setApiState('loading');
    RetrieveProperty(id)
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        setApiState('success');
        setProperty(r);
      })
      .catch((e) => {
        console.log(e);
        setApiState('failed');
      });
  }, [id]);

  const buildAddress = (property: Property | undefined) => {
    if (property === undefined) return '';

    const addressParts = [
      property.Address.Street,
      property.Address.Suburb,
      property.Address.Postcode,
      property.Address.State,
    ];
    return addressParts.join(', ');
  };
  const address = buildAddress(property);

  const HouseLayout: React.FC<{ house: Property | undefined }> = ({ house }) => {
    return house === undefined ? null : (
      <p>
        <KingBedOutlinedIcon fontSize={'inherit'} /> Bedrooms: {house?.Layout?.Bedrooms} |{' '}
        <BathtubOutlinedIcon fontSize={'inherit'} /> Bathrooms: {house?.Layout?.Bathrooms} |{' '}
        <DriveEtaOutlinedIcon fontSize={'inherit'} /> Parking: {house?.Layout?.Parking}
      </p>
    );
  };

  return (
    <>
      <BreadcrumbNav crumbs={[{ name: 'Properties', route: '/Properties' }]}>
        {address}
      </BreadcrumbNav>
      <Typography variant={'h4'}>{property?.Price}</Typography>
      <HouseLayout house={property} />
      <Grid container spacing={3}>
        <Grid item sm={12} md={6}>
          <Paper>
            <div>
              {property?.Tags?.map((t) => (
                <Chip key={t} label={t} />
              ))}
            </div>
            <TextField
              label="Notes"
              value={property?.Notes}
              multiline
              rows={5}
              fullWidth
              margin="normal"
            />
            <List>
              {property?.References?.map((r) => (
                <ListItem button component="a" key={r.Value} href={r.Value}>
                  <ListItemText primary={r.Type} secondary={r.Value} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item sm={12} md={6}>
          <Card className={classes.mapCard}>
            <CardContent className={classes.mapCardContent}>
              <MapEmbed
                placeId={property?.Location.PlaceID}
                showPlaceholder
                title="property location"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {apiState === 'loading' ? (
        <Loading />
      ) : (
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="rawdb-content"
            id={'rawdb-header-' + property?.ID}
          >
            Raw DB information
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>
              <pre>{JSON.stringify(property, null, 2)}</pre>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )}
    </>
  );
};

const Loading: FunctionComponent = () => <div>Loading</div>;

export default Listing;
