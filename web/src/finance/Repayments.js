import React from 'react';
import { CostsCalculator } from './CostsCalculator';
import { BudgetRow } from './Common';

const Repayments = (props) => {
  const { interestRate, loanLength, loanAmount } = props;

  const monthly = -CostsCalculator.RepaymentsMonthly(interestRate, loanLength, loanAmount);
  const totalPaid = monthly * 12 * loanLength;
  const totalInterestPaid = totalPaid - loanAmount;

  return (
    <div>
      <h3>Repayments ({interestRate * 100}%)</h3>
      <BudgetRow desc="Monthly" val={monthly} format="currency" />
      <BudgetRow desc="Total Paid" val={totalPaid} format="currency" />
      <BudgetRow desc="Total Interest Paid" val={totalInterestPaid} format="currency" />
    </div>
  );
};

export default Repayments;
