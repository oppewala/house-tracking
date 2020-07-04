import React from 'react';
import OutputCard from './OutputCard';

const Costs = ({ price, stampDuty, transferFee, applicationFee, total }) => {
  const items = [
    { label: 'Property Price', value: price, format: 'currency' },
    { label: 'Stamp Duty', value: stampDuty, format: 'currency' },
    { label: 'Transfer Fee', value: transferFee, format: 'currency' },
    { label: 'Mortgage Application Fee', value: applicationFee, format: 'currency' },
  ];
  const totalItem = {
    label: 'Total Cost',
    value: total,
    format: 'currency',
  };

  return <OutputCard title="Costs" items={items} total={totalItem} />;
};

export default Costs;
