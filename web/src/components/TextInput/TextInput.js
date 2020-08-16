import { FormControl, InputLabel, OutlinedInput, FormHelperText } from '@material-ui/core';
import React from 'react';

export const TextInput = ({ desc, handleChange, name, value, subText }) => {
  const subTextEl = subText ? <FormHelperText>{subText}</FormHelperText> : null;

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor={name}>{desc}</InputLabel>
      <OutlinedInput name={name} label={desc} value={value} onChange={handleChange} type="text" />
      {subTextEl}
    </FormControl>
  );
};
