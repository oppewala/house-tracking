import React from 'react';
import { Card, CardContent, Typography, Divider, Grid } from '@material-ui/core';

const OutputCard = () => {
  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h6">Costs</Typography>
          <Divider />
          <StandardRow label="Property Price" value="$1000.00" />
          <StandardRow label="Stamp Duty" value="$1000.00" />
          <StandardRow label="Transfer Fee" value="$1000.00" />
          <StandardRow label="Mortgage Application Fee" value="$1000.00" />
          <Grid container direction="row" alignContent="space-between">
            <Grid item xs>
              Total Cost
            </Grid>
            <Grid item>$1000.00</Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

const StandardRow = (props) => {
  const { label, value } = props;

  return (
    <Grid container direction="row" alignContent="space-between">
      <Grid item xs>
        {label}
      </Grid>
      <Grid item>{value}</Grid>
    </Grid>
  );
};

export default OutputCard;
