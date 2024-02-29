import React from 'react';
import { Grid } from '@mui/material';
import { CheckboxInput } from 'components/CheckboxInput';
import { CashInput } from 'components/CashInput';
import { PercentageInput } from 'components/PercentageInput';
import { YearInput } from '../../../components/YearInput';

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
          <YearInput
            desc="Mortgage Length"
            value={length}
            name="length"
            handleChange={onLengthChange}
          />
        </Grid>
        <Grid item>
          <CashInput
            desc="Monthly Living Costs"
            value={monthlyLivingCosts}
            name="monthlyLivingCosts"
            handleChange={onLivingCostsChange}
            subText="excluding repayments"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Inputs;
