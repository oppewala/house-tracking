import React from 'react';
import OutputCard from './OutputCard';

interface Props {
  savings: number;
  isFirstHomeBuyerEligible: boolean | null | undefined;
}

const Deposit: React.FC<Props> = ({ savings, isFirstHomeBuyerEligible }) => {
  const firstHomeBuyer = isFirstHomeBuyerEligible ? 10000 : null;

  const totalSavings = Number(firstHomeBuyer) + Number(savings);

  const items = [
    { label: 'Savings', value: savings, format: 'currency' },
    { label: 'First Home Buyers Grant', value: firstHomeBuyer, format: 'currency' },
  ];
  const totalItem = {
    label: 'Total Deposit',
    value: totalSavings,
    format: 'currency',
  };

  return <OutputCard title="Deposit" items={items} total={totalItem} />;
};

export default Deposit;
