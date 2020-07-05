import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
} from '@material-ui/core';
import React from 'react';

export const CashInput = ({ desc, handleChange, name, value, subText }) => {
  let initValue = value;
  if (Number.isNaN(value)) {
    initValue = 0.0;
  }

  const subTextEl = subText ? <FormHelperText>{subText}</FormHelperText> : null;

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor={name}>{desc}</InputLabel>
      <OutlinedInput
        name={name}
        label={desc}
        value={initValue}
        onChange={handleChange}
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
        type="number"
      />
      {subTextEl}
    </FormControl>
  );
};
