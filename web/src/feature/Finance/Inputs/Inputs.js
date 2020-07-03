import React from 'react';
import { Grid } from '@material-ui/core';
import CheckboxInput from 'components/CheckboxInput/CheckboxInput';
import CashInput from 'components/CashInput/CashInput';
import PercentageInput from 'components/PercentageInput/PercentageInput';

const Inputs = (props) => {
  const { firstHomeBuyer, onFirstHomeBuyerChange } = props;
  const { housePrice, onPriceChange } = props;
  const { savings, onSavingsChange } = props;
  const { interestRate, onInterestRateChange } = props;
  const { length, onLengthChange } = props;
  const { monthlyLivingCosts, onLivingCostsChange } = props;

  return (
    <>
      <Grid container spacing={5} direction="column">
        <Grid item>
          <CheckboxInput
            checked={firstHomeBuyer}
            onChange={onFirstHomeBuyerChange}
            label="First Home Buyer"
            name="firstHomeBuyer"
          />
        </Grid>
        <Grid item>
          <CashInput
            desc="Property Price"
            value={housePrice}
            name="housePrice"
            handleChange={onPriceChange}
          />
        </Grid>
        <Grid item>
          <CashInput
            desc="Joint Savings"
            value={savings}
            name="savings"
            handleChange={onSavingsChange}
          />
        </Grid>
        <Grid item>
          <PercentageInput
            desc="Interest Rates"
            value={interestRate}
            name="interestRate"
            handleChange={onInterestRateChange}
          />
        </Grid>
        <Grid item>
          <CashInput
            desc="Mortgage Length (yrs)"
            value={length}
            name="length"
            handleChange={onLengthChange}
          />
        </Grid>
        <Grid item>
          <CashInput
            desc="Monthly Living Costs (excl repayments)"
            value={monthlyLivingCosts}
            name="monthlyLivingCosts"
            handleChange={onLivingCostsChange}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Inputs;
