import React from "react";
import CostsCalculator from "./CostsCalculator";
import {BudgetRow} from "./Common";

const Repayments = (props) => {
    const monthly = -CostsCalculator.RepaymentsMonthly(
        props.interestRate,
        props.loanLength,
        props.loanAmount)
    const totalPaid = monthly * 12 * props.loanLength;
    const totalInterestPaid = totalPaid - props.loanAmount;

    return (
        <div>
            <h3>Repayments ({props.interestRate * 100}%)</h3>
            <BudgetRow desc='Monthly' val={monthly} format='currency' />
            <BudgetRow desc='Total Paid' val={totalPaid} format='currency' />
            <BudgetRow desc='Total Interest Paid' val={totalInterestPaid} format='currency' />
        </div>
    )
}

export default Repayments;