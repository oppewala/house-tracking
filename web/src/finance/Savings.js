import React from 'react';
import { BudgetRow, BudgetSubTotal } from './Common'

const Savings = (props) => {

    return (
        <div>
            <h3>Savings</h3>
            <BudgetRow desc="Joint" val={props.joint} format='currency' />
            <BudgetSubTotal desc="Total Deposit" val={props.joint} format='currency' />
        </div>
    )
}

export default Savings;