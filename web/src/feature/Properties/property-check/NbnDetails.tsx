import React, { useEffect, useState } from 'react';
import { NbnSearchResult } from './NbnSearchResult';

interface Props {
  address: any;
}

const NbnDetails: React.FC<Props> = ({ address }) => {

  const [nbnSearch, setNbnSearch] = useState<any>([]);
  const [selectedLoc, setSelectedLoc] = useState<string>('');
  const [nbnInfo, setNbnInfo] = useState<any>({});

  useEffect(() => {
    if (!address.street || address.street === '') return;

    const queryParams: any = {
      Street: address.street,
      Suburb: undefined,
      State: undefined,
      Postcode: undefined
    };
    if (address.suburb && address.suburb !== '') {
      queryParams.Suburb = address.suburb;
    }
    if (address.state && address.state !== '') {
      queryParams.State = address.state;
    }
    if (address.postcode && address.postcode !== '') {
      queryParams.Postcode = address.postcode;
    }

    const query = Object.keys(queryParams)
      .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(queryParams[k])}`)
      .join('&');

    fetch(`https://api.house.crackedjar.com/nbn?${query}`)
      .then((r) => r.json())
      .then((j) => {
        setNbnSearch(j);
      })
      .catch((e) => console.error(e));
  }, [address, setNbnSearch]);

  useEffect(() => {
    if (selectedLoc === undefined || selectedLoc.trim() === '') return;
    console.log(selectedLoc);

    fetch(`https://api.house.crackedjar.com/nbn/${selectedLoc}`)
      .then((r) => r.json())
      .then((j) => setNbnInfo(j))
      .catch((e) => console.error(e));
  }, [selectedLoc, setNbnInfo]);

  const searchResultElements = nbnSearch.map((s: any) => (
    <NbnSearchResult
      key={s.Id}
      id={s.Id}
      formattedAddress={s.FormattedAddress}
      selectHandler={setSelectedLoc}
    />
  ));

  return (
    <div className="py-2">
      <h3 className="font-bold text-md">NBN Details</h3>
      <div>
        <h4 className="font-bold">Matching NBN results</h4>
        <table>
          <tbody>{searchResultElements}</tbody>
        </table>
      </div>
      <div className="py-2">
        <h4 className="font-bold">LOC Service Type</h4>
        <NbnInfo nbnInfo={nbnInfo} />
      </div>
    </div>
  );
};

interface NbnInfoProps {
  nbnInfo: any;
}

const NbnInfo = (props: NbnInfoProps) => {
  const { nbnInfo } = props;
  if (nbnInfo === undefined) return <div />;

  return (
    <div>
      <div>Type: {nbnInfo.TechType}</div>
      <div>Status: {nbnInfo.ServiceStatus}</div>
    </div>
  );
};

export default NbnDetails;
