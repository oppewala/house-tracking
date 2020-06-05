import React, { Component } from 'react';
import Costs from './Costs';
import Savings from './Savings';
import Mortgage from './Mortgage';
import { CostsCalculator } from './CostsCalculator';
import Repayments from './Repayments';

class Budget extends Component {
  constants = {
    mortgageApplicationFee: 130,
  };

  constructor() {
    super();

    this.state = {
      housePrice: localStorage.getItem('Budget.housePrice') || 0,
      savings: localStorage.getItem('Budget.savings') || 0,
      interestRate: localStorage.getItem('Budget.interestRate') || 0.03,
      length: localStorage.getItem('Budget.length') || 30,
      monthlyLivingCosts: localStorage.getItem('Budget.monthlyLivingCosts') || 0,
      firstHomeBuyer: localStorage.getItem('Budget.firstHomeBuyer') || false,
    };
  }

  priceChangeHandler = (e) => {
    const { value, name } = e.target;

    this.setState({ [name]: value });
    localStorage.setItem(`Budget.${name}`, value);
  };

  fhbHandler = (e) => {
    const value = e.target.checked;
    this.setState({ firstHomeBuyer: value });
    localStorage.setItem(`Budget.firstHomeBuyer`, value);
  };

  formReset = () => {
    this.setState({
      housePrice: 0,
      savings: 0,
      interestRate: 0.03,
      length: 30,
      monthlyLivingCosts: 0,
      firstHomeBuyer: false,
    });
    localStorage.setItem(`Budget.housePrice`, 0);
    localStorage.setItem(`Budget.savings`, 0);
    localStorage.setItem(`Budget.interestRate`, 0.03);
    localStorage.setItem(`Budget.length`, 30);
    localStorage.setItem(`Budget.monthlyLivingCosts`, 0);
    localStorage.setItem(`Budget.firstHomeBuyer`, 'false');
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

    const isFirstHomeBuyerEligible = firstHomeBuyer && housePrice <= 600000;
    const totalSavings = CostsCalculator.Savings(savings, isFirstHomeBuyerEligible);
    const mortgageAmount = totalCosts - totalSavings;

    const monthlyRepayment = -CostsCalculator.RepaymentsMonthly(
      interestRate,
      length,
      mortgageAmount,
    );

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
          desc="Mortgage Length (yrs)"
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
        <div>
          <button type="button" onClick={this.formReset}>
            Reset
          </button>
        </div>
        <Costs
          price={housePrice}
          stampDuty={stampDuty}
          transferFee={transferFee}
          applicationFee={this.constants.mortgageApplicationFee}
          total={totalCosts}
        />
        <Savings joint={savings} isFirstHomeBuyerEligible={isFirstHomeBuyerEligible} />
        <Mortgage
          housePrice={housePrice}
          totalCost={totalCosts}
          mortgageAmount={mortgageAmount}
          monthlyRepayments={monthlyRepayment}
          monthlyLivingCosts={monthlyLivingCosts}
        />
        <Repayments
          interestRate={interestRate}
          mortgageAmount={mortgageAmount}
          mortgageLength={length}
        />
        <Repayments
          interestRate={3 / 100}
          mortgageAmount={mortgageAmount}
          mortgageLength={length}
        />
        <Repayments
          interestRate={5 / 100}
          mortgageAmount={mortgageAmount}
          mortgageLength={length}
        />
        <Repayments
          interestRate={8 / 100}
          mortgageAmount={mortgageAmount}
          mortgageLength={length}
        />
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
