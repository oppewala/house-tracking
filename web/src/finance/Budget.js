import React, { useEffect, useState } from 'react';
import Costs from './Costs';
import Savings from './Savings';
import Mortgage from './Mortgage';
import { CostsCalculator } from './CostsCalculator';
import Repayments from './Repayments';

const Budget = () => {
  const constants = {
    mortgageApplicationFee: 130,
  };

  const useStateWithLocalStorage = (localStorageKey, defaultValue) => {
    const [value, setValue] = useState(localStorage.getItem(localStorageKey) || defaultValue);

    useEffect(() => {
      localStorage.setItem(localStorageKey, value);
    }, [localStorageKey, value]);

    return [value, setValue];
  };

  const [housePrice, setPrice] = useStateWithLocalStorage('Budget.housePrice', 0);
  const [savings, setSavings] = useStateWithLocalStorage('Budget.savings', 0);
  const [interestRate, setInterestRate] = useStateWithLocalStorage('Budget.interestRate', 0.03);
  const [length, setLength] = useStateWithLocalStorage('Budget.length', 30);
  const [monthlyLivingCosts, setLivingCosts] = useStateWithLocalStorage(
    'Budget.monthlyLivingCosts',
    0,
  );
  const [firstHomeBuyer, setFirstHomeBuyer] = useStateWithLocalStorage(
    'Budget.firstHomeBuyer',
    false,
  );

  const onPriceChange = (e) => setPrice(e.target.value);
  const onSavingsChange = (e) => setSavings(e.target.value);
  const onInterestRateChange = (e) => setInterestRate(e.target.value);
  const onLengthChange = (e) => setLength(e.target.value);
  const onLivingCostsChange = (e) => setLivingCosts(e.target.value);
  const onFirstHomeBuyerChange = (e) => setFirstHomeBuyer(e.target.checked);

  const formReset = () => {
    setPrice(0);
    setSavings(0);
    setInterestRate(0.03);
    setLength(30);
    setLivingCosts(0);
    setFirstHomeBuyer(false);
  };

  const stampDuty = CostsCalculator.StampDuty(housePrice, firstHomeBuyer);
  const transferFee = CostsCalculator.TransferFee(housePrice);
  const totalCosts = CostsCalculator.TotalCosts(
    housePrice,
    stampDuty,
    transferFee,
    constants.mortgageApplicationFee,
  );

  const isFirstHomeBuyerEligible = firstHomeBuyer && housePrice <= 600000;
  const totalSavings = CostsCalculator.Savings(savings, isFirstHomeBuyerEligible);
  const mortgageAmount = totalCosts - totalSavings;

  const monthlyRepayment = -CostsCalculator.RepaymentsMonthly(interestRate, length, mortgageAmount);

  return (
    <div>
      <h2>Budget</h2>
      <h3>Inputs</h3>
      <Input
        desc="Property Price"
        value={housePrice}
        name="housePrice"
        handleChange={onPriceChange}
      />
      <Input desc="Joint Savings" value={savings} name="savings" handleChange={onSavingsChange} />
      <Input
        desc="Interest Rates"
        value={interestRate}
        name="interestRate"
        handleChange={onInterestRateChange}
      />
      <Input
        desc="Mortgage Length (yrs)"
        value={length}
        name="length"
        handleChange={onLengthChange}
      />
      <Input
        desc="Monthly Living"
        value={monthlyLivingCosts}
        name="monthlyLivingCosts"
        handleChange={onLivingCostsChange}
      />
      <div>
        First Home Buyer
        <input
          type="checkbox"
          checked={firstHomeBuyer}
          name="firstHomeBuyer"
          onChange={onFirstHomeBuyerChange}
        />
      </div>
      <div>
        <button type="button" onClick={formReset}>
          Reset
        </button>
      </div>
      <Costs
        price={housePrice}
        stampDuty={stampDuty}
        transferFee={transferFee}
        applicationFee={constants.mortgageApplicationFee}
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
      <Repayments interestRate={3 / 100} mortgageAmount={mortgageAmount} mortgageLength={length} />
      <Repayments interestRate={5 / 100} mortgageAmount={mortgageAmount} mortgageLength={length} />
      <Repayments interestRate={8 / 100} mortgageAmount={mortgageAmount} mortgageLength={length} />
    </div>
  );
};

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
