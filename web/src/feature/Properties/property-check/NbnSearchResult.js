import React from 'react';

export const NbnSearchResult = (props) => {
  const { id, formattedAddress, selectHandler } = props;

  const onClick = () => {
    selectHandler(id);
  };

  return (
    <tr className="border-2 bg-gray-100 cursor-pointer" onClick={onClick}>
      <td>{id}</td>
      <td>{formattedAddress}</td>
    </tr>
  );
};

export default NbnSearchResult;
