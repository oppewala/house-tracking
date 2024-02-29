import React, { useEffect, useState } from 'react';
import { FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';

export const PercentageInput = ({ desc, handleChange, name, value }) => {
  let initValue = value;
  if (Number.isNaN(value)) {
    initValue = 0.0;
  }

  const [displayValue, setDisplayValue] = useState(initValue * 100);
  useEffect(() => {
    handleChange(displayValue / 100);
  }, [displayValue, handleChange]);

  const onValueChange = (e) => setDisplayValue(e.target.value);

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor={name}>{desc}</InputLabel>
      <OutlinedInput
        name={name}
        label={desc}
        value={displayValue}
        onChange={onValueChange}
        endAdornment={<InputAdornment position="end">%</InputAdornment>}
        type="number"
      />
    </FormControl>
  );
};
