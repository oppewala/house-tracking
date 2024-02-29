import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
} from '@mui/material';
import React from 'react';

interface Props {
  desc: string;
  handleChange: any;
  name: string;
  value: number;
  subText?: string;
}

export const CashInput: React.FC<Props> = ({ desc, handleChange, name, value, subText }) => {
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
