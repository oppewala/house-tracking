import React, { FunctionComponent, useEffect, useState } from 'react';
import { RetrieveProperty } from '../../../_services/ApiService/houseApi';
import { Typography } from '@material-ui/core';
import { BreadcrumbNav } from '../components/Breadcrumb/BreadcrumbNav';
import { Property } from '../../../_services/ApiService/types';

interface Props {
  id: string;
}

export const Listing: FunctionComponent<Props> = ({ id }) => {
  const [apiState, setApiState] = useState<string>('loading');
  const [property, setProperty] = useState<Property>();
  useEffect(() => {
    setApiState('loading');
    RetrieveProperty(id)
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        setApiState('success');
        setProperty(r);
      })
      .catch((e) => {
        console.log(e);
        setApiState('failed');
      });
  }, [id]);

  const buildAddress = (property: Property | undefined) => {
    if (property === undefined) return '';

    const addressParts = [
      property.Address.Street,
      property.Address.Suburb,
      property.Address.Postcode,
      property.Address.State,
    ];
    return addressParts.join(', ');
  };
  const address = buildAddress(property);

  return (
    <>
      <BreadcrumbNav crumbs={[{ name: 'Properties', route: '/Properties' }]}>
        {address}
      </BreadcrumbNav>
      <Typography variant={'h4'}>{property?.Price}</Typography>
      <div>
        {apiState === 'loading' ? (
          <Loading />
        ) : (
          <div>
            <pre>{JSON.stringify(property, null, 2)}</pre>
          </div>
        )}
      </div>
    </>
  );
};

const Loading: FunctionComponent = () => <div>Loading</div>;

export default Listing;
