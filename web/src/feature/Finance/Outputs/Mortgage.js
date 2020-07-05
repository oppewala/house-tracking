import React from 'react';
import { CostsCalculator } from '../CostsCalculator';
import OutputCard from './OutputCard';

const Mortgage = (props) => {
  const { mortgageAmount, housePrice, totalCost, monthlyRepayments, monthlyLivingCosts } = props;

  const lvr = mortgageAmount / housePrice;

  const minimum = CostsCalculator.MinimumDeposit(housePrice, totalCost);

  const totalRepayments = monthlyRepayments * 6;
  const totalLivingCosts = monthlyLivingCosts * 6;
  const minimumSixMo = minimum + totalLivingCosts + totalRepayments;

  const items = [
    { label: 'Total Mortgage', value: mortgageAmount, format: 'currency' },
    { label: 'LVR', value: lvr, format: 'percent' },
    { label: 'Minimum Deposit for 80% LVR', value: minimum, format: 'currency' },
    { label: 'Minimum Deposit + 6mo Living Costs', value: minimumSixMo, format: 'currency' },
  ];

  return <OutputCard title="Mortgage Details" items={items} />;
};

export default Mortgage;
