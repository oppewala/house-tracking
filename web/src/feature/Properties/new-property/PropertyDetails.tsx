import React from 'react';
import { NumberInput } from 'components/NumberInput';
import { Grid } from '@material-ui/core';
import { CheckboxInput } from 'components/CheckboxInput';
import { FieldErrors } from 'react-hook-form';

interface Props {
  inputRef: React.Ref<any>;
  errors: FieldErrors<any>;
}

const PropertyDetails = ({ inputRef, errors }: Props): JSX.Element => {
  return (
    <Grid container direction="row" spacing={5}>
      <Grid item xs={12} sm={4} lg={3}>
        <NumberInput
          desc="Bedrooms"
          name="bedrooms"
          subText=""
          inputRef={inputRef}
          error={!!errors.bedrooms}
        />
      </Grid>
      <Grid item xs={12} sm={4} lg={3}>
        <NumberInput
          desc="Bathrooms"
          name="bathrooms"
          subText=""
          inputRef={inputRef}
          error={!!errors.bathrooms}
        />
      </Grid>
      <Grid item xs={12} sm={4} lg={3}>
        <NumberInput
          desc="Parking"
          name="parking"
          subText=""
          inputRef={inputRef}
          error={!!errors.parking}
        />
      </Grid>
      <Grid item xs={12} lg={3}>
        <CheckboxInput label="Extra Rooms" name="extrarooms" inputRef={inputRef} />
      </Grid>
    </Grid>
  );
};

export default PropertyDetails;
