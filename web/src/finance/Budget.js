import React, { Component } from 'react';
import Costs from './Costs';
import Savings from './Savings';
import Loan from './Loan';
import { CostsCalculator } from './CostsCalculator';
import Repayments from './Repayments';

class Budget extends Component {
  constants = {
    mortgageApplicationFee: 130,
  };

  constructor() {
    super();

    this.state = {
      housePrice: 0,
      savings: 0,
      interestRate: 0.03,
      length: 30,
      monthlyLivingCosts: 0,
      firstHomeBuyer: false,
    };
  }

  priceChangeHandler = (e) => {
    const { value, name } = e.target;

    this.setState({ [name]: value });
  };

  fhbHandler = (e) => {
    const value = e.target.checked;
    this.setState({ firstHomeBuyer: value });
  };

  render() {
    const {
      housePrice,
      savings,
      length,
      interestRate,
      monthlyLivingCosts,
      firstHomeBuyer,
    } = this.state;

    const stampDuty = CostsCalculator.StampDuty(housePrice, firstHomeBuyer);
    const transferFee = CostsCalculator.TransferFee(housePrice);
    const totalCosts = CostsCalculator.TotalCosts(
      housePrice,
      stampDuty,
      transferFee,
      this.constants.mortgageApplicationFee,
    );

    const loanAmount = totalCosts - savings;

    const monthlyRepayment = -CostsCalculator.RepaymentsMonthly(interestRate, length, loanAmount);

    return (
      <div>
        <h2>Budget</h2>
        <h3>Inputs</h3>
        <Input
          desc="Property Price"
          value={housePrice}
          name="housePrice"
          handleChange={this.priceChangeHandler}
        />
        <Input
          desc="Joint Savings"
          value={savings}
          name="savings"
          handleChange={this.priceChangeHandler}
        />
        <Input
          desc="Interest Rates"
          value={interestRate}
          name="interestRate"
          handleChange={this.priceChangeHandler}
        />
        <Input
          desc="Loan Length (yrs)"
          value={length}
          name="length"
          handleChange={this.priceChangeHandler}
        />
        <Input
          desc="Monthly Living"
          value={monthlyLivingCosts}
          name="monthlyLivingCosts"
          handleChange={this.priceChangeHandler}
        />
        <div>
          First Home Buyer
          <input
            type="checkbox"
            checked={firstHomeBuyer}
            name="firstHomeBuyer"
            onChange={this.fhbHandler}
          />
        </div>
        <Costs
          price={housePrice}
          stampDuty={stampDuty}
          transferFee={transferFee}
          applicationFee={this.constants.mortgageApplicationFee}
          total={totalCosts}
        />
        <Savings joint={savings} />
        <Loan
          housePrice={housePrice}
          totalCost={totalCosts}
          loanAmount={loanAmount}
          monthlyRepayments={monthlyRepayment}
          monthlyLivingCosts={monthlyLivingCosts}
        />
        <Repayments interestRate={interestRate} loanAmount={loanAmount} loanLength={length} />
        <Repayments interestRate={3 / 100} loanAmount={loanAmount} loanLength={length} />
        <Repayments interestRate={5 / 100} loanAmount={loanAmount} loanLength={length} />
        <Repayments interestRate={8 / 100} loanAmount={loanAmount} loanLength={length} />
      </div>
    );
  }
}

const Input = (props) => {
  const { desc, handleChange, name } = props;
  let { value } = props;
  if (Number.isNaN(value)) {
    value = 0.0;
  }

  return (
    <div>
      {desc}
      <input type="number" value={value} name={name} onChange={handleChange} />
    </div>
  );
};

export default Budget;
