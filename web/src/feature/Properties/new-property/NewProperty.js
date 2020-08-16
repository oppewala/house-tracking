import React, { Component } from 'react';
import {
  Grid,
  Hidden,
  Typography,
  Card,
  CardContent,
  Link,
  TextField,
  withStyles,
  Button,
  MenuItem,
  Select,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { TextInput } from 'components/TextInput';
import Address from '../common/Address';
import PropertyDetails from './PropertyDetails';
import References from './References';

const styles = (theme) => ({
  breadcrumb: {
    marginBottom: theme.spacing() * 3,
  },
  urlSelect: {
    width: '100%',
  },
});

class NewProperty extends Component {
  constructor() {
    super();

    const initScore = {
      bathrooms: 1,
      bedrooms: 1,
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
        extrarooms: false,
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

  extraRoomsHandler = (e) => {
    const { house } = this.state;
    house[e.currentTarget.name] = e.currentTarget.checked;

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
      // eslint-disable-next-line no-console
      .then((r) => console.log('Success', r)) // TODO: Handle properly
      // eslint-disable-next-line no-console
      .catch((ex) => console.error('Failed', ex)); // TODO: Handle properly
  };

  render() {
    const { house } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <Typography variant="subtitle1" className={classes.breadcrumb}>
          <Link variant="button" color="textPrimary" component={RouterLink} to="/Properties">
            Properties
          </Link>{' '}
          / Add new property
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Address changeHandler={this.addressFieldChangeHandler} address={house.address} />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  desc="Price"
                  name="price"
                  value={house.price}
                  handleChange={this.onPriceChange}
                />
              </Grid>
              <Grid item xs={12}>
                <PropertyDetails
                  house={house}
                  onRoomChange={this.onRoomChange}
                  onExtraRoomsChecked={this.extraRoomsHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5">Tags</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5">Links</Typography>
                <Grid container spacing={1}>
                  {house.references.map((h) => {
                    return (
                      <Grid key={h.url} container item xs={12} spacing={1}>
                        <Grid item xs>
                          <Select value={h.source} variant="outlined" className={classes.urlSelect}>
                            <MenuItem value="Domain">Domain</MenuItem>
                            <MenuItem value="Realestate">Realestate</MenuItem>
                          </Select>
                        </Grid>
                        <Grid item xs={9}>
                          <TextInput value={h.url} desc="URL" />
                        </Grid>
                      </Grid>
                    );
                  })}
                  <Grid item xs={12}>
                    <Button variant="text" color="secondary">
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5">Links</Typography>
                <References
                  references={house.references}
                  addHandler={this.addReferenceHandler}
                  deleteHandler={this.deleteReferenceHandler}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container direction="column" spacing={5}>
              <Hidden smDown>
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5">Map</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Hidden>
              <Grid item xs={12}>
                <TextField multiline label="Notes" variant="outlined" fullWidth rows={6} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <br />
        <Button type="submit" onClick={this.submitForm} variant="text" color="primary">
          Submit
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(NewProperty);
