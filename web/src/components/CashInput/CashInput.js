import { TextField } from '@material-ui/core';
import React from 'react';

export const CashInput = ({ desc, handleChange, name, value, subText }) => {
  let initValue = value;
  if (Number.isNaN(value)) {
    initValue = 0.0;
  }

  return (
    <TextField
      fullWidth
      name={name}
      label={desc}
      variant="outlined"
      value={initValue}
      onChange={handleChange}
      inputMode="decimal"
      type="number"
      helperText={subText}
    />
  );
};
