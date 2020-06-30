import React from 'react';
import { TextField, Grid } from '@material-ui/core';
import PropertyValueInput from './PropertyValueInput';
import CheckboxInput from './CheckboxInput';

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
          <PropertyValueInput
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
          <CashInput
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

const CashInput = (props) => {
  const { desc, handleChange, name } = props;
  let { value } = props;
  if (Number.isNaN(value)) {
    value = 0.0;
  }

  return (
    <TextField
      fullWidth
      name={name}
      label={desc}
      variant="outlined"
      value={value}
      onChange={handleChange}
    />
  );
};

export default Inputs;
