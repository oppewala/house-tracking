import React, { FunctionComponent } from 'react';
import { Card, CardContent, Grid } from '@mui/material';
import { MapEmbed } from 'feature/Properties/components/MapEmbed/MapEmbed';

interface Props {
  placeId: string;
}

export const Map: FunctionComponent<Props> = ({ placeId }) => {
  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <MapEmbed placeId={placeId} showPlaceholder title="property location" />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Map;
