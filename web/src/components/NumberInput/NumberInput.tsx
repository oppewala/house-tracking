import { TextField } from '@mui/material';
import React, { FunctionComponent } from 'react';

interface Props {
  name: string;
  desc: string;
  value?: number;
  handleChange?: any;
  subText?: string;
  inputRef: React.Ref<any>;
  error?: boolean;
}

export const NumberInput: FunctionComponent<Props> = ({
  desc,
  handleChange,
  name,
  value,
  subText,
  inputRef,
  error,
}) => {
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
      inputRef={inputRef}
      error={error}
    />
  );
};
