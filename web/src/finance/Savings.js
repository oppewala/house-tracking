import React from 'react';
import { BudgetRow, BudgetSubTotal } from './Common';

const Savings = (props) => {
  const { joint, isFirstHomeBuyerEligible } = props;

  const firstHomeBuyer = isFirstHomeBuyerEligible ? 10000 : null;

  const totalSavings = Number(firstHomeBuyer) + Number(joint);

  return (
    <div className="budget-box w-full">
      <h3 className="text-gray-900 font-bold text-lg mb-2">Savings</h3>
      <BudgetRow desc="Joint" val={joint} format="currency" />
      <BudgetRow desc="First Home Buyers Grant" val={firstHomeBuyer} format="currency" />
      <BudgetSubTotal desc="Total Deposit" val={totalSavings} format="currency" />
    </div>
  );
};

export default Savings;
