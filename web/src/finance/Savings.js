import React from 'react';
import { BudgetRow, BudgetSubTotal } from './Common';

const Savings = (props) => {
  const { joint, isFirstHomeBuyerEligible } = props;

  const firstHomeBuyer = isFirstHomeBuyerEligible ? 10000 : null;

  const totalSavings = Number(firstHomeBuyer) + Number(joint);

  return (
    <div>
      <h3>Savings</h3>
      <BudgetRow desc="Joint" val={joint} format="currency" />
      <BudgetRow desc="First Home Buyers Grant" val={firstHomeBuyer} format="currency" />
      <BudgetSubTotal desc="Total Deposit" val={totalSavings} format="currency" />
    </div>
  );
};

export default Savings;
