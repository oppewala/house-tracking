import React, { FunctionComponent, useEffect, useState } from 'react';
import { RetrieveProperty } from '../../../_services/ApiService/houseApi';
import { Typography } from '@material-ui/core';
import { BreadcrumbNav } from '../components/Breadcrumb/BreadcrumbNav';
import { Property } from '../../../_services/ApiService/types';
import KingBedOutlinedIcon from '@material-ui/icons/KingBedOutlined';
import BathtubOutlinedIcon from '@material-ui/icons/BathtubOutlined';
import DriveEtaOutlinedIcon from '@material-ui/icons/DriveEtaOutlined';

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

  const HouseLayout: React.FC<{ house: Property | undefined }> = ({ house }) => {
    return house === undefined ? null : (
      <p>
        <KingBedOutlinedIcon fontSize={'inherit'} /> Bedrooms: {house?.Layout?.Bedrooms} |{' '}
        <BathtubOutlinedIcon fontSize={'inherit'} /> Bathrooms: {house?.Layout?.Bathrooms} |{' '}
        <DriveEtaOutlinedIcon fontSize={'inherit'} /> Parking: {house?.Layout?.Parking}
      </p>
    );
  };

  return (
    <>
      <BreadcrumbNav crumbs={[{ name: 'Properties', route: '/Properties' }]}>
        {address}
      </BreadcrumbNav>
      <Typography variant={'h4'}>{property?.Price}</Typography>
      <HouseLayout house={property} />
      <textarea>{property?.Notes}</textarea>
      <ul>
        {property?.References?.map((r) => (
          <li key={r.Value}>
            <a href={r.Value}>{r.Value}</a>
          </li>
        ))}
      </ul>
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
