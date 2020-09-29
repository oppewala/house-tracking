import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import {
  Grid,
  Chip,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  makeStyles,
} from '@material-ui/core';

interface Props {
  tags: string[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
}

const useStyles = makeStyles((theme) => ({
  chipContainer: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

export const Tags: FunctionComponent<Props> = ({ tags, addTag, removeTag }) => {
  const classes = useStyles();

  const desc = 'Tags';
  const name = 'tags';

  const [newTag, newTagUpdate] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    newTagUpdate(e.currentTarget.value);
  };

  const handleSubmit = (e: React.KeyboardEvent) => {
    console.log(e, e.key);
    if (e.key === 'Enter' && newTag && newTag !== '') {
      addTag(newTag);
      newTagUpdate('');
    }
  };

  return (
    <Grid item xs={12}>
      <Typography variant="h5">Tags</Typography>
      <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor={name}>{desc}</InputLabel>
        <OutlinedInput
          name={name}
          label={desc}
          type="text"
          value={newTag}
          onChange={handleChange}
          onKeyPress={handleSubmit}
        />
      </FormControl>
      <div className={classes.chipContainer}>
        {tags.map((t) => (
          <Chip key={t} label={t} onDelete={() => removeTag(t)} />
        ))}
      </div>
    </Grid>
  );
};

export default Tags;
