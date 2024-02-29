import React from 'react';
import { styled } from '@mui/material/styles';
import { Card, CardContent, Typography, Divider, Grid } from '@mui/material';
import clsx from 'clsx';

const PREFIX = 'OutputCard';

const classes = {
  spacing: `${PREFIX}-spacing`,
  title: `${PREFIX}-title`,
  totalRow: `${PREFIX}-totalRow`
};

const StyledGrid = styled(Grid)((
  {
    theme
  }
) => ({
  [`&.${classes.spacing}`]: {
    padding: `${theme.spacing(1.5)} 0`,
  },

  [`& .${classes.title}`]: {
    padding: `0 0 ${theme.spacing(1.5)} 0`,
  },

  [`&.${classes.totalRow}`]: {
    padding: `${theme.spacing(1.5)} 0 0 0`,
    fontWeight: 500,
  }
}));

const formatter = (value: number, opt: string) => {
  let val: string | number = value;
  if (opt === 'currency') {
    const currencyFormatter = new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
    });
    val = currencyFormatter.format(val);
  }

  if (opt === 'percent') {
    const perc = +Math.round(value * 10000) / 100;
    val = `${perc}%`;
  }

  return val;
};

interface Props {
  title: string;
  items: Item[];
  total: Item;
}

interface Item {
  label: string;
  value: number;
  format: string;
}

const OutputCard: React.FC<Props> = ({ title, items, total }) => {


  const elements = items.map((item) => (
    <StandardRow key={item.label} label={item.label} value={item.value} format={item.format} />
  ));

  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <Divider />
          {elements}

          {total ? (
            <>
              <Divider />
              <TotalRow label={total.label} value={total.value} format={total.format} />
            </>
          ) : null}
        </CardContent>
      </Card>
    </>
  );
};

const TotalRow: React.FC<Item> = ({ label, value, format }) => {
  if (value === null) return null;
  const val = formatter(value, format);

  return (
    <StyledGrid
      container
      direction="row"
      alignContent="space-between"
      className={clsx(classes.spacing, classes.totalRow)}
    >
      <Grid item xs>
        {label}
      </Grid>
      <Grid item>{val}</Grid>
    </StyledGrid>
  );
};

const StandardRow: React.FC<Item> = ({ label, value, format }) => {
  if (value === null) return null;
  const val = formatter(value, format);

  return (
    <StyledGrid container direction="row" alignContent="space-between" className={classes.spacing}>
      <Grid item xs>
        {label}
      </Grid>
      <Grid item>{val}</Grid>
    </StyledGrid>
  );
};

export default OutputCard;
