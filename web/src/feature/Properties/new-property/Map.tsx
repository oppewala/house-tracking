import React, { FunctionComponent } from 'react';
import { Card, CardContent, Grid } from '@material-ui/core';
import { MapEmbed } from 'components/MapEmbed/MapEmbed';

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
