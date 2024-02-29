import React from 'react';

interface Props {
  id: string;
  formattedAddress: string;
  selectHandler: any;
}

export const NbnSearchResult: React.FC<Props> = ({ id, formattedAddress, selectHandler }) => {

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
