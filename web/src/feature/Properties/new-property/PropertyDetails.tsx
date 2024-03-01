import React from 'react';
import { NumberInput } from '@/components/NumberInput';
import { Grid } from '@mui/material';
import { CheckboxInput } from '@/components/CheckboxInput';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormInputs } from './NewProperty';

interface Props {
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
}

const PropertyDetails: React.FC<Props> = ({ register, errors }) => {
  const bedrooms = register('bedrooms')
  const bathrooms = register('bathrooms')
  const parking = register('parking')
  const extrarooms = register('extrarooms', { required: false })

  return (
    <Grid container direction="row" spacing={5}>
      <Grid item xs={12} sm={4} lg={3}>
        <NumberInput
          desc="Bedrooms"
          name={bedrooms.name}
          subText=""
          inputRef={bedrooms.ref}
          error={!!errors.bedrooms}
        />
      </Grid>
      <Grid item xs={12} sm={4} lg={3}>
        <NumberInput
          desc="Bathrooms"
          name={bathrooms.name}
          subText=""
          inputRef={bathrooms.ref}
          error={!!errors.bathrooms}
        />
      </Grid>
      <Grid item xs={12} sm={4} lg={3}>
        <NumberInput
          desc="Parking"
          name={parking.name}
          subText=""
          inputRef={parking.ref}
          error={!!errors.parking}
        />
      </Grid>
      <Grid item xs={12} lg={3}>
        <CheckboxInput label="Extra Rooms" name={extrarooms.name} inputRef={extrarooms.ref} />
      </Grid>
    </Grid>
  );
};

export default PropertyDetails;
