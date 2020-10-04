import React, { FunctionComponent, useEffect, useState } from 'react';
import { Property } from '../types';
import { RetrieveProperty } from '../../../_services/ApiService/houseApi';

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

  return (
    <>
      <h1>Listing for property {id}</h1>
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
