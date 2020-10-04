import React, { FunctionComponent } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { PropertyReference } from '../types';
import { TextInput } from 'components/TextInput/TextInput';

interface Props {
  references: PropertyReference[];
  updateReference(id: number, url: string): void;
  removeReference(id: number): void;
  addReference(): void;
}

export const References: FunctionComponent<Props> = ({
  references,
  updateReference,
  removeReference,
  addReference,
}) => {
  const onUpdateReference = (e, id) => {
    updateReference(id, e.currentTarget.value);
  };

  return (
    <Grid item xs={12}>
      <Typography variant="h5">Links</Typography>
      <Grid container spacing={1}>
        {references.map((h) => {
          return (
            <Grid key={h.id} container item xs={12} spacing={1}>
              <Grid item xs={10}>
                <TextInput
                  name={h.value}
                  value={h.value}
                  desc="URL"
                  handleChange={(e) => onUpdateReference(e, h.id)}
                />
              </Grid>
              <Grid item xs={2}>
                <Button variant="outlined" color="secondary" onClick={() => removeReference(h.id)}>
                  Remove
                </Button>
              </Grid>
            </Grid>
          );
        })}
        <Grid item xs={12}>
          <Button variant="outlined" color="secondary" onClick={() => addReference()}>
            Add
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default References;
