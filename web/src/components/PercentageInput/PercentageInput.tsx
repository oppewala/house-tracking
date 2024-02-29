import React, { useEffect, useState } from 'react';
import { FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { toNumber } from 'lodash';

interface Props
{
  desc: React.ReactNode;
  handleChange: (i: number) => void;
  name: string;
  value: number;
}

export const PercentageInput: React.FC<Props> = ({ desc, handleChange, name, value }) => {
  let initValue = value;
  if (Number.isNaN(value)) {
    initValue = 0.0;
  }

  const [displayValue, setDisplayValue] = useState(initValue * 100);
  useEffect(() => {
    handleChange(displayValue / 100);
  }, [displayValue, handleChange]);

  const onValueChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (e) => setDisplayValue(toNumber(e.target.value));

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
