import { TextField } from '@material-ui/core';
import React from 'react';

const PropertyValueInput = (props) => {
  const { desc, handleChange, name } = props;
  let { value } = props;
  if (Number.isNaN(value)) {
    value = 0.0;
  }

  return (
    <TextField
      fullWidth
      name={name}
      label={desc}
      variant="outlined"
      value={value}
      onChange={handleChange}
    />
  );
};

export default PropertyValueInput;
