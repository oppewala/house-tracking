import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
} from '@mui/material';
import React from 'react';

interface Props {
  desc: React.ReactNode;
  handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  name: string;
  value: number;
  subText?: string | undefined;
}

export const YearInput: React.FC<Props> = ({ desc, handleChange, name, value, subText }) => {
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
        endAdornment={<InputAdornment position="end">years</InputAdornment>}
        type="number"
      />
      {subTextEl}
    </FormControl>
  );
};
