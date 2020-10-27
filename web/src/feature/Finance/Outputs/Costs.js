import React from 'react';
import OutputCard from './OutputCard';

const Costs = ({ price, stampDuty, transferFee, applicationFee, total, incidentalCosts }) => {
  const items = [
    { label: 'Property Price', value: price, format: 'currency' },
    { label: 'Stamp Duty', value: stampDuty, format: 'currency' },
    { label: 'Transfer Fee', value: transferFee, format: 'currency' },
    { label: 'Mortgage Application Fee', value: applicationFee, format: 'currency' },
    {
      label: 'Incidental costs (solicitor, due diligence, moving costs etc)',
      value: incidentalCosts,
      format: 'currency',
    },
  ];
  const totalItem = {
    label: 'Total Cost',
    value: total,
    format: 'currency',
  };

  return <OutputCard title="Costs" items={items} total={totalItem} />;
};

export default Costs;
