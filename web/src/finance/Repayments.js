import React from 'react';
import { CostsCalculator } from './CostsCalculator';
import { BudgetRow } from './Common';

const Repayments = (props) => {
  const { interestRate, mortgageLength, mortgageAmount } = props;

  const monthly = -CostsCalculator.RepaymentsMonthly(interestRate, mortgageLength, mortgageAmount);
  const totalPaid = monthly * 12 * mortgageLength;
  const totalInterestPaid = totalPaid - mortgageAmount;

  return (
    <div>
      <h3 className="font-bold text-l">Repayments ({interestRate * 100}%)</h3>
      <BudgetRow desc="Monthly" val={monthly} format="currency" />
      <BudgetRow desc="Total Paid" val={totalPaid} format="currency" />
      <BudgetRow desc="Total Interest Paid" val={totalInterestPaid} format="currency" />
    </div>
  );
};

export default Repayments;
