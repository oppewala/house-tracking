import React from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';

export const CheckboxInput = ({ checked, onChange, label, name }) => {
  return (
    <>
      <FormControlLabel
        control={<Checkbox name={name} checked={checked} onChange={onChange} />}
        label={label}
      />
    </>
  );
};
