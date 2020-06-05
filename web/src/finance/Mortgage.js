import React from 'react';
import { BudgetRow } from './Common';
import { CostsCalculator } from './CostsCalculator';

const Mortgage = (props) => {
  const { mortgageAmount, housePrice, totalCost, monthlyRepayments, monthlyLivingCosts } = props;

  const lvr = mortgageAmount / housePrice;

  const minimum = CostsCalculator.MinimumDeposit(housePrice, totalCost);

  const totalRepayments = monthlyRepayments * 6;
  const totalLivingCosts = monthlyLivingCosts * 6;
  const minimumSixMo = minimum + totalLivingCosts + totalRepayments;

  return (
    <div>
      <h3>Mortgage Details</h3>
      <BudgetRow desc="Total Mortgage" val={mortgageAmount} format="currency" />
      <BudgetRow desc="LVR" val={lvr} format="percent" />
      <BudgetRow desc="Minimum Deposit for 80% LVR" val={minimum} format="currency" />
      <BudgetRow desc="Minimum Deposit + 6mo Living Costs" val={minimumSixMo} format="currency" />
    </div>
  );
};

export default Mortgage;
