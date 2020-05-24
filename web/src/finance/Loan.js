import React from 'react';
import { BudgetRow } from './Common';
import { CostsCalculator } from './CostsCalculator';

const Loan = (props) => {
  const { loanAmount, housePrice, totalCost, monthlyRepayments, monthlyLivingCosts } = props;

  const lvr = loanAmount / housePrice;

  const minimum = CostsCalculator.MinimumDeposit(housePrice, totalCost);

  const totalRepayments = monthlyRepayments * 6;
  const totalLivingCosts = monthlyLivingCosts * 6;
  const minimumSixMo = minimum + totalLivingCosts + totalRepayments;

  return (
    <div>
      <h3>Loan Details</h3>
      <BudgetRow desc="Total Loan" val={loanAmount} format="currency" />
      <BudgetRow desc="LVR" val={lvr} format="percent" />
      <BudgetRow desc="Minimum Deposit for 80% LVR" val={minimum} format="currency" />
      <BudgetRow desc="Minimum Deposit + 6mo Living Costs" val={minimumSixMo} format="currency" />
    </div>
  );
};

export default Loan;
