import React, { Component } from 'react';
import { Grid, Hidden, Typography, Link, TextField, withStyles, Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { TextInput } from 'components/TextInput';
import { AddressInput } from 'components/AddressInput';
import Tags from './Tags';
import Map from './Map';
import PropertyDetails from './PropertyDetails';
import References from './References';
import { connect, ConnectedProps } from 'react-redux';
import {
  addTag,
  setAddress,
  setPropertyConfiguration,
  removeTag,
  addReference,
  removeReference,
  updateReference,
  setPrice,
  setNotes,
  //setScore,
} from './NewPropertySlice';
import { RootState } from 'reducers';

const styles = (theme) => ({
  breadcrumb: {
    marginBottom: theme.spacing() * 3,
  },
  urlSelect: {
    width: '100%',
  },
});

class NewProperty extends Component<NewPropertyProps> {
  addressFieldChangeHandler = (address) => {
    this.props.setAddress(address);
  };

  onPriceChange = (e) => {
    this.props.setPrice(e.currentTarget.value);
  };

  onRoomChange = (e) => {
    const conf = {};
    conf[e.currentTarget.name] = Number(e.currentTarget.value);
    this.props.setPropertyConfiguration(conf);
  };

  onNotesChange = (e) => {
    this.props.setNotes(e.currentTarget.value);
  };

  extraRoomsHandler = (e) => {
    this.props.setPropertyConfiguration({
      hasExtraRooms: e.currentTarget.checked,
    });
  };

  submitForm = (e) => {
    e.preventDefault();

    fetch('https://api.house.crackedjar.com/house', {
      method: 'POST',
      body: JSON.stringify(this.props.newPropertyState.property),
    })
      // eslint-disable-next-line no-console
      .then((r) => console.log('Success', r)) // TODO: Handle properly
      // eslint-disable-next-line no-console
      .catch((ex) => console.error('Failed', ex)); // TODO: Handle properly
  };

  render() {
    const { classes, newPropertyState } = this.props;
    const { property } = newPropertyState;

    // <p>{JSON.stringify(this.props, null, 2)}</p>

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
                <AddressInput changeHandler={this.addressFieldChangeHandler} address={property} />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  desc="Price"
                  name="price"
                  value={property.price}
                  handleChange={this.onPriceChange}
                />
              </Grid>
              <Grid item xs={12}>
                <PropertyDetails
                  house={property}
                  onRoomChange={this.onRoomChange}
                  onExtraRoomsChecked={this.extraRoomsHandler}
                />
              </Grid>
              <Tags
                tags={property.tags}
                addTag={this.props.addTag}
                removeTag={this.props.removeTag}
              />
              <References
                references={property.references}
                addReference={this.props.addReference}
                removeReference={this.props.removeReference}
                updateReference={this.props.updateReference}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container direction="column" spacing={5}>
              <Hidden smDown>
                <Map placeId={property.address.placeId} />
              </Hidden>
              <Grid item xs={12}>
                <TextField
                  onChange={this.onNotesChange}
                  multiline
                  label="Notes"
                  variant="outlined"
                  fullWidth
                  rows={6}
                />
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

const mapStateToProps = (state: RootState) => ({
  newPropertyState: state.properties.newProperty,
});

const mapDispatch = {
  addTag,
  removeTag,
  setAddress,
  //setScore,
  setPrice,
  addReference,
  removeReference,
  updateReference,
  setPropertyConfiguration,
  setNotes,
};

const connector = connect(mapStateToProps, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

type NewPropertyProps = PropsFromRedux & {
  classes: any;
};
export default connector(withStyles(styles)(NewProperty));
