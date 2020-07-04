import React, { useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';

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
    <TextField
      fullWidth
      name={name}
      label={desc}
      variant="outlined"
      value={displayValue}
      onChange={onValueChange}
    />
  );
};
