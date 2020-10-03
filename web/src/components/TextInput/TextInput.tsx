import { FormControl, InputLabel, OutlinedInput, FormHelperText } from '@material-ui/core';
import React, { FunctionComponent } from 'react';

interface Props {
  desc: string;
  name: string;
  handleChange?: any;
  value?: string | number;
  subText?: string;
  inputRef?: React.Ref<any>;
  error?: boolean;
}

export const TextInput: FunctionComponent<Props> = ({
  desc,
  handleChange,
  name,
  value,
  subText,
  inputRef,
  error,
}) => {
  const subTextEl = subText ? <FormHelperText>{subText}</FormHelperText> : null;

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor={name} error={error}>
        {desc}
      </InputLabel>
      <OutlinedInput
        name={name}
        label={desc}
        value={value}
        onChange={handleChange}
        type="text"
        inputRef={inputRef}
        error={error}
      />
      {subTextEl}
    </FormControl>
  );
};
