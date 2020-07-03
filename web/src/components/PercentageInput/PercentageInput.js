import React, { useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';

const PercentageInput = (props) => {
  const { desc, handleChange, name } = props;
  let { value } = props;
  if (Number.isNaN(value)) {
    value = 0.0;
  }

  const [displayValue, setDisplayValue] = useState(value * 100);
  useEffect(() => {
    handleChange(displayValue / 100);
  }, [displayValue]);

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

export default PercentageInput;
