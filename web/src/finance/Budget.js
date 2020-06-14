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

    let v = value;
    if (v === 'false') {
      v = false;
    }
    if (v === 'true') {
      v = true;
    }

    useEffect(() => {
      localStorage.setItem(localStorageKey, value);
    }, [localStorageKey, value]);

    return [v, setValue];
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
    <section className="">
      <h2 className="text-gray-900 font-bold text-2xl mb-2">Budget</h2>
      <div>
        <h3 className="text-gray-900 font-bold text-xl mb-2">Inputs</h3>
        <div>
          <Input
            desc="Property Price"
            value={housePrice}
            name="housePrice"
            handleChange={onPriceChange}
          />
          <Input
            desc="Joint Savings"
            value={savings}
            name="savings"
            handleChange={onSavingsChange}
          />
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
            desc="Monthly Living Costs (excl repayments)"
            value={monthlyLivingCosts}
            name="monthlyLivingCosts"
            handleChange={onLivingCostsChange}
          />
          <div className="py-2">
            <span className="input-label inline">First Home Buyer</span>
            <input
              className="ml-2"
              type="checkbox"
              checked={firstHomeBuyer}
              name="firstHomeBuyer"
              onChange={onFirstHomeBuyerChange}
            />
          </div>
          <div className="py-4 text-gray-700">
            <button
              className="hover:bg-gray-200 font-bold rounded border-gray-200 border-2 py-2 px-4"
              type="button"
              onClick={formReset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      <div className="pt-4">
        <h3 className="text-gray-900 font-bold text-xl mb-2">Output</h3>
        <div
          className="pb-2 flex flex-col
        sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 items-start"
        >
          <Costs
            price={housePrice}
            stampDuty={stampDuty}
            transferFee={transferFee}
            applicationFee={constants.mortgageApplicationFee}
            total={totalCosts}
          />
          <Savings joint={savings} isFirstHomeBuyerEligible={isFirstHomeBuyerEligible} />
        </div>
        <div
          className="pb-2 flex flex-col sm:flex-row
        space-y-2 sm:space-y-0 sm:space-x-2 items-start"
        >
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
        </div>
      </div>
      <div className="pt-4">
        <h3 className="text-gray-900 font-bold text-xl mb-2">Different Interest Rates</h3>
        <div className="flex flex-col md:flex-row">
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
      </div>
    </section>
  );
};

const Input = (props) => {
  const { desc, handleChange, name } = props;
  let { value } = props;
  if (Number.isNaN(value)) {
    value = 0.0;
  }

  return (
    <div className="py-2">
      <label htmlFor={name}>
        <span className="input-label block">{desc}</span>
        <input
          type="number"
          value={value}
          name={name}
          onChange={handleChange}
          className="input-plain focus:outline-none focus:shadow-outline"
        />
      </label>
    </div>
  );
};

export default Budget;
