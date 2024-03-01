import React, { ChangeEvent } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

interface Props {
  label: string;
  name: string;
  checked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  inputRef?: React.Ref<any>;
  error?: boolean;
}

export const CheckboxInput: React.FC<Props> = ({ checked, onChange, label, name, inputRef }) => {
  return (
    <>
      <FormControlLabel
        control={<Checkbox name={name} checked={checked} onChange={onChange} inputRef={inputRef} />}
        label={label}
      />
    </>
  );
};
