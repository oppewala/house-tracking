import React from 'react';
import OutputCard from './OutputCard';

const Savings = (props) => {
  const { joint, isFirstHomeBuyerEligible } = props;

  const firstHomeBuyer = isFirstHomeBuyerEligible ? 10000 : null;

  const totalSavings = Number(firstHomeBuyer) + Number(joint);

  const items = [
    { label: 'Joint', value: joint, format: 'currency' },
    { label: 'First Home Buyers Grant', value: firstHomeBuyer, format: 'currency' },
  ];
  const totalItem = {
    label: 'Total Deposit',
    value: totalSavings,
    format: 'currency',
  };

  return <OutputCard title="Savings" items={items} total={totalItem} />;
};

export default Savings;
