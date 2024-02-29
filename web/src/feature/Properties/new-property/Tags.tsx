import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Chip, Typography, FormControl, InputLabel, OutlinedInput } from '@mui/material';

const PREFIX = 'Tags';

const classes = {
  chipContainer: `${PREFIX}-chipContainer`
};

const StyledGrid = styled(Grid)((
  {
    theme
  }
) => ({
  [`& .${classes.chipContainer}`]: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  }
}));

interface Props {
  tags: string[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
}

export const Tags: FunctionComponent<Props> = ({ tags, addTag, removeTag }) => {


  const desc = 'Tags';
  const name = 'tags';

  const [newTag, newTagUpdate] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    newTagUpdate(e.currentTarget.value);
  };

  const handleSubmit = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') e.preventDefault();
    if (e.key === 'Enter' && newTag && newTag !== '') {
      addTag(newTag);
      newTagUpdate('');
    }
  };

  return (
    <StyledGrid item xs={12}>
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
          <Chip key={t} label={t} onDelete={() => removeTag(t)} aria-label={t} />
        ))}
      </div>
    </StyledGrid>
  );
};

export default Tags;
