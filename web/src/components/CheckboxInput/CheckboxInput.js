import React from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';

const CheckboxInput = (props) => {
  const { checked, onChange, label, name } = props;

  return (
    <>
      <FormControlLabel
        control={<Checkbox name={name} checked={checked} onChange={onChange} />}
        label={label}
      />
    </>
  );
};

export default CheckboxInput;
