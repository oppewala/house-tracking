import React, { useEffect, useState } from 'react';
import { NbnSearchResult } from './NbnSearchResult';

const NbnDetails = (props) => {
  const { address } = props;

  const [nbnSearch, setNbnSearch] = useState([]);
  const [selectedLoc, setSelectedLoc] = useState('');
  const [nbnInfo, setNbnInfo] = useState({});

  useEffect(() => {
    if (!address.street || address.street === '') return;

    const queryParams = {
      Street: address.street,
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
  }, [selectedLoc]);

  const searchResultElements = nbnSearch.map((s) => (
    <NbnSearchResult
      key={s.Id}
      id={s.Id}
      formattedAddress={s.FormattedAddress}
      selectHandler={setSelectedLoc}
    />
  ));

  return (
    <div>
      <h3>NBN Details</h3>
      <div>
        <h4>Matching NBN results</h4>
        <table>
          <tbody>{searchResultElements}</tbody>
        </table>
      </div>
      <div>
        <h4>LOC Service Type</h4>
        <NbnInfo nbnInfo={nbnInfo} />
      </div>
    </div>
  );
};

const NbnInfo = (props) => {
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
