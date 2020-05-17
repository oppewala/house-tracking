import React, {Component} from 'react';
import Costs from './Costs'
import Savings from './Savings'
import Loan from "./Loan";
import Calculator from "./CostsCalculator";
import Repayments from "./Repayments";

class Budget extends Component {
    state = {
        housePrice: 0,
        savings: 0,
        interestRate: .03,
        length: 30,
        monthlyLivingCosts: 0
    }

    constants = {
        mortgageApplicationFee: 130
    }

    priceChangeHandler = (e) => {
        const prop = e.target.name;
        this.setState({[prop]: Number(e.target.value)})
    }

    render() {
        const stampDuty = Calculator.StampDuty(this.state.housePrice);
        const transferFee = Calculator.TransferFee(this.state.housePrice);
        const totalCosts = Calculator.TotalCosts(
            this.state.housePrice,
            stampDuty,
            transferFee,
            this.constants.mortgageApplicationFee);

        const totalSavings = this.state.savings;

        const loanAmount = totalCosts - totalSavings;

        const monthlyRepayment = -Calculator.RepaymentsMonthly(
            this.state.interestRate,
            this.state.length,
            loanAmount
        );

        return (
            <div>
                <h2>Budget</h2>
                <h3>Inputs</h3>
                <Input desc='House Price' value={this.state.housePrice} name='housePrice' handleChange={this.priceChangeHandler} />
                <Input desc='Joint Savings' value={this.state.savings} name='savings' handleChange={this.priceChangeHandler} />
                <Input desc='Interest Rates' value={this.state.interestRate} name='interestRate' handleChange={this.priceChangeHandler} />
                <Input desc='Loan Length (yrs)' value={this.state.length} name='length' handleChange={this.priceChangeHandler} />
                <Input desc='Monthly Living' value={this.state.monthlyLivingCosts} name='monthlyLivingCosts' handleChange={this.priceChangeHandler} />
                <Costs
                    price={this.state.housePrice}
                    stampDuty={stampDuty}
                    transferFee={transferFee}
                    applicationFee={this.constants.mortgageApplicationFee}
                    total={totalCosts}
                />
                <Savings joint={this.state.savings} />
                <Loan
                    housePrice={this.state.housePrice}
                    totalCost={totalCosts}
                    loanAmount={loanAmount}
                    monthlyRepayments={monthlyRepayment}
                    monthlyLivingCosts={this.state.monthlyLivingCosts}
                />
                <Repayments
                    interestRate={this.state.interestRate}
                    loanAmount={loanAmount}
                    loanLength={this.state.length}
                    />
                <Repayments
                    interestRate={3 / 100}
                    loanAmount={loanAmount}
                    loanLength={this.state.length}
                />
                <Repayments
                    interestRate={5 / 100}
                    loanAmount={loanAmount}
                    loanLength={this.state.length}
                />
                <Repayments
                    interestRate={8 / 100}
                    loanAmount={loanAmount}
                    loanLength={this.state.length}
                />
            </div>
        )
    }
}

const Input = (props) => {
    return (
        <div>
            {props.desc} <input type='text' value={props.value} name={props.name} onChange={props.handleChange}/>
        </div>
    )
}

export default Budget;