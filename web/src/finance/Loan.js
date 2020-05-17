import React from "react";
import {BudgetRow} from "./Common";
import CostsCalculator from "./CostsCalculator";

const Loan = (props) => {
    let lvr = props.loanAmount / props.housePrice;

    let minimum = CostsCalculator.MinimumDeposit(props.housePrice, props.totalCost);

    let totalRepayments = props.monthlyRepayments * 6;
    let totalLivingCosts = props.monthlyLivingCosts * 6;
    let minimumSixMo = minimum + totalLivingCosts + totalRepayments;

    console.log(props.monthlyRepayments, totalRepayments, totalLivingCosts)


    return (
        <div>
            <h3>Loan Details</h3>
            <BudgetRow desc="Total Loan" val={props.loanAmount} format='currency' />
            <BudgetRow desc="LVR" val={lvr} format='percent' />
            <BudgetRow desc="Minimum Deposit for 80% LVR" val={minimum} format='currency' />
            <BudgetRow desc="Minimum Deposit + 6mo Living Costs" val={minimumSixMo} format='currency' />
        </div>
    )
}

export default Loan;