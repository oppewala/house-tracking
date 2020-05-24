import React from 'react';
import { BudgetRow, BudgetSubTotal } from './Common';

const Savings = (props) => {
  const { joint } = props;

  return (
    <div>
      <h3>Savings</h3>
      <BudgetRow desc="Joint" val={joint} format="currency" />
      <BudgetSubTotal desc="Total Deposit" val={joint} format="currency" />
    </div>
  );
};

export default Savings;
