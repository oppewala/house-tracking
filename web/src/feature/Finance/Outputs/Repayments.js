import React from 'react';
import { Round } from '_helpers/round';
import { CostsCalculator } from '../CostsCalculator';
import OutputCard from './OutputCard';

const Repayments = (props) => {
  const { interestRate, mortgageLength, mortgageAmount } = props;

  const monthly = -CostsCalculator.RepaymentsMonthly(interestRate, mortgageLength, mortgageAmount);
  const totalPaid = monthly * 12 * mortgageLength;
  const totalInterestPaid = totalPaid - mortgageAmount;

  const items = [
    { label: 'Monthly Repayment', value: monthly, format: 'currency' },
    { label: 'Total Interest Paid', value: totalInterestPaid, format: 'currency' },
  ];

  const total = { label: 'Total Paid', value: totalPaid, format: 'currency' };

  return (
    <OutputCard
      title={`Repayments (${Round(interestRate * 100, 3)}%)`}
      items={items}
      total={total}
    />
  );
};

export default Repayments;
