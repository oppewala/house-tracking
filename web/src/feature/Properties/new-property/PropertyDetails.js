import React from 'react';
import { NumberInput } from 'components/NumberInput';
import { Grid } from '@material-ui/core';
import { CheckboxInput } from '../../../components/CheckboxInput';

const PropertyDetails = (props) => {
  const { house, onRoomChange, onExtraRoomsChecked } = props;

  return (
    <Grid container direction="row" spacing={5}>
      <Grid item xs={12} sm={4} lg={3}>
        <NumberInput
          desc="Bedrooms"
          name="bedrooms"
          value={house.bedrooms}
          handleChange={onRoomChange}
        />
      </Grid>
      <Grid item xs={12} sm={4} lg={3}>
        <NumberInput
          desc="Bathrooms"
          name="bathrooms"
          value={house.bathrooms}
          handleChange={onRoomChange}
        />
      </Grid>
      <Grid item xs={12} sm={4} lg={3}>
        <NumberInput
          desc="Parking"
          name="parking"
          value={house.parking}
          handleChange={onRoomChange}
        />
      </Grid>
      <Grid item xs={12} lg={3}>
        <CheckboxInput label="Extra Rooms" onChange={onExtraRoomsChecked} />
      </Grid>
    </Grid>
  );
};

export default PropertyDetails;
