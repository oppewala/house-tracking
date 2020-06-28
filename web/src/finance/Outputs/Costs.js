import React from 'react';
import { Card } from '@material-ui/core';
import { BudgetRow, BudgetSubTotal } from './Common';

const Costs = (props) => {
  const { price, stampDuty, transferFee, applicationFee, total } = props;

  return (
    <Card>
      <h3 className="header header-lg mb-2">Costs</h3>
      <BudgetRow desc="Property Price" val={price} format="currency" />
      <BudgetRow desc="Stamp Duty" val={stampDuty} format="currency" />
      <BudgetRow desc="Transfer Fee" val={transferFee} format="currency" />
      <BudgetRow desc="Mortgage Application Fee" val={applicationFee} format="currency" />
      <BudgetSubTotal desc="Total Cost" val={total} format="currency" />
    </Card>
  );
};

export default Costs;
