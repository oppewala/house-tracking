import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Button, Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useClipboard } from 'use-clipboard-copy';
import clsx from 'clsx';
import Costs from './Outputs/Costs';
import Mortgage from './Outputs/Mortgage';
import { CostsCalculator } from './CostsCalculator';
import Repayments from './Outputs/Repayments';
import Inputs from './Inputs/Inputs';
import Deposit from './Outputs/Deposit';

const PREFIX = 'Budget';

const classes = {
  root: `${PREFIX}-root`,
  container: `${PREFIX}-container`,
  inputContainer: `${PREFIX}-inputContainer`,
  outputContainer: `${PREFIX}-outputContainer`,
  sectionTitle: `${PREFIX}-sectionTitle`,
  subSectionTitle: `${PREFIX}-subSectionTitle`
};

const StyledGrid = styled(Grid)((
  {
    theme
  }
) => ({
  [`&.${classes.root}`]: {
    height: '100%',
  },

  [`& .${classes.container}`]: {
    padding: `${theme.spacing() * 6}px ${theme.spacing() * 5}px 0`,
  },

  [`& .${classes.inputContainer}`]: {
    backgroundColor: 'white',
    borderRight: `1px solid ${theme.palette.divider}`,
    boxSizing: 'border-box',
  },

  [`& .${classes.outputContainer}`]: {},

  [`& .${classes.sectionTitle}`]: {
    height: theme.spacing() * 7,
    marginBottom: theme.spacing() * 3,
    verticalAlign: 'bottom',
  },

  [`& .${classes.subSectionTitle}`]: {
    display: 'table-cell',
  }
}));

const Budget = () => {
  const constants = {
    mortgageApplicationFee: 130,
    incidentalCosts: 5000,
  };

  const location = useLocation();
  const clipboard = useClipboard();

  const useStateWithLocalStorage = (localStorageKey, defaultValue) => {
    let initialState = localStorage.getItem(localStorageKey) || defaultValue;
    if (location.search && location.search !== '') {
      const urlParams = new URLSearchParams(location.search);
      const queryState = urlParams.get(localStorageKey);

      if (queryState) initialState = queryState;
    }
    const [value, setValue] = useState(initialState);

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
    constants.incidentalCosts,
  );

  const isFirstHomeBuyerEligible = firstHomeBuyer && housePrice <= 600000;
  const totalSavings = CostsCalculator.Savings(savings, isFirstHomeBuyerEligible);
  const mortgageAmount = totalCosts - totalSavings;

  const monthlyRepayment = -CostsCalculator.RepaymentsMonthly(interestRate, length, mortgageAmount);

  const shareForm = () => {
    let url = new URL(window.location.href);

    Object.keys(localStorage).forEach((key) => {
      if (!key.startsWith('Budget')) return;

      url.searchParams.set(key, localStorage.getItem(key));
    });

    clipboard.copy(url.href);
  };

  return (
    <StyledGrid container spacing={0} direction="row" className={classes.root}>
      <Grid item xs={12} sm={6} md={4} className={clsx(classes.container, classes.inputContainer)}>
        <Box className={classes.input}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            className={classes.sectionTitle}
          >
            <Grid item>
              <Typography variant="h3">Budget</Typography>
            </Grid>
            <Grid item>
              <Button onClick={shareForm} color="primary">
                Share
              </Button>
              <Button onClick={formReset} color="secondary">
                Reset
              </Button>
            </Grid>
          </Grid>
          <Inputs
            housePrice={housePrice}
            onPriceChange={onPriceChange}
            firstHomeBuyer={firstHomeBuyer}
            onFirstHomeBuyerChange={onFirstHomeBuyerChange}
            savings={savings}
            onSavingsChange={onSavingsChange}
            interestRate={interestRate}
            onInterestRateChange={setInterestRate}
            length={length}
            onLengthChange={onLengthChange}
            monthlyLivingCosts={monthlyLivingCosts}
            onLivingCostsChange={onLivingCostsChange}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={8} className={clsx(classes.container, classes.outputContainer)}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <Box className={classes.sectionTitle}>
              <Typography
                variant="h5"
                className={clsx(classes.sectionTitle, classes.subSectionTitle)}
              >
                Result
              </Typography>
            </Box>
            <Grid container direction="column" spacing={5}>
              <Grid item>
                <Costs
                  price={housePrice}
                  stampDuty={stampDuty}
                  transferFee={transferFee}
                  applicationFee={constants.mortgageApplicationFee}
                  incidentalCosts={constants.incidentalCosts}
                  total={totalCosts}
                />
              </Grid>
              <Grid item>
                <Deposit savings={savings} isFirstHomeBuyerEligible={isFirstHomeBuyerEligible} />
              </Grid>
              <Grid item>
                <Mortgage
                  housePrice={housePrice}
                  totalCost={totalCosts}
                  mortgageAmount={mortgageAmount}
                  monthlyRepayments={monthlyRepayment}
                  monthlyLivingCosts={monthlyLivingCosts}
                />
              </Grid>
              <Grid item>
                <Repayments
                  interestRate={interestRate}
                  mortgageAmount={mortgageAmount}
                  mortgageLength={length}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className={classes.sectionTitle}>
              <Typography
                variant="h5"
                className={clsx(classes.sectionTitle, classes.subSectionTitle)}
              >
                Different Interest Rates
              </Typography>
            </Box>
            <Grid container direction="column" spacing={5}>
              <Grid item>
                <Repayments
                  interestRate={3 / 100}
                  mortgageAmount={mortgageAmount}
                  mortgageLength={length}
                />
              </Grid>
              <Grid item>
                <Repayments
                  interestRate={5 / 100}
                  mortgageAmount={mortgageAmount}
                  mortgageLength={length}
                />
              </Grid>
              <Grid item>
                <Repayments
                  interestRate={8 / 100}
                  mortgageAmount={mortgageAmount}
                  mortgageLength={length}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </StyledGrid>
  );
};

export default Budget;
