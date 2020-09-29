import React, { ChangeEvent } from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';

interface Props {
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  label: string;
  name: string;
}

export const CheckboxInput = ({ checked, onChange, label, name }: Props): JSX.Element => {
  return (
    <>
      <FormControlLabel
        control={<Checkbox name={name} checked={checked} onChange={onChange} />}
        label={label}
      />
    </>
  );
};
