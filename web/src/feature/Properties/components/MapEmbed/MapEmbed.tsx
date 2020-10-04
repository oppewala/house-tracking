import React from 'react';
import { config } from '_helpers/config';

interface Props {
  placeId?: string;
  title: string;
  showPlaceholder?: boolean;
}

export const MapEmbed = ({ placeId, title, showPlaceholder }: Props): JSX.Element => {
  if (!showPlaceholder && (!placeId || placeId === '')) return <></>;
  if (!config.GoogleApiKey || config.GoogleApiKey === '') return <></>;

  let url = new URL('https://www.google.com/maps/embed/v1/');
  if (placeId && placeId !== '') {
    url = new URL('place', url);
    url.searchParams.append('q', `place_id:${placeId}`);
  } else {
    url = new URL('view', url);
    url.searchParams.append('zoom', '9');
    url.searchParams.append('center', '-37.8136,144.9631');
  }
  url.searchParams.append('key', config.GoogleApiKey);

  return (
    <iframe
      title={title}
      width="100%"
      height="100%"
      frameBorder="0"
      src={url.href}
      allowFullScreen
    ></iframe>
  );
};
