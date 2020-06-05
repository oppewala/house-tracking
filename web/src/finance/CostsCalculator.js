// eslint-disable-next-line import/prefer-default-export
export class CostsCalculator {
  static StampDuty = (housePrice, firstHomeBuyer) => {
    if (firstHomeBuyer && housePrice <= 600000) return 0;

    const stampDuty = 2870 + (Number(housePrice) - 130000) * 0.06;
    if (!firstHomeBuyer) return Math.max(stampDuty, 0);

    const stampDutyFHBDiscount = (stampDuty * (housePrice - 600000)) / 150000;
    return Math.round((Math.min(stampDutyFHBDiscount, stampDuty) + Number.EPSILON) * 100) / 100;
  };

  static TransferFee = (housePrice) => 98.5 + (housePrice / 1000) * 2.34;

  static TotalCosts = (housePrice, stampDuty, transferFee, applicationFee) => {
    return Number(housePrice) + Number(stampDuty) + Number(transferFee) + Number(applicationFee);
  };

  static MinimumDeposit = (housePrice, totalCost) =>
    0.2 * Number(housePrice) + Number(totalCost) - Number(housePrice);

  static RepaymentsMonthly = (interestRate, loanLength, loanValue) => {
    if (interestRate > 0.2) console.warn('Interest rate above 20% - potentially unexpected');

    const repayments = CostsCalculator.PMT(
      interestRate / 12, // Interest Rate is annual, convert to months
      loanLength * 12, // Loan Length is in years, convert to months
      loanValue,
      0,
      0,
    );
    return Math.round((repayments + Number.EPSILON) * 100) / 100;
  };

  // From stackoverflow
  // https://stackoverflow.com/questions/2094967/excel-pmt-function-in-js/6088618
  static PMT = (ratePerPeriod, numberOfPayments, presentValue, futureValue, type) => {
    if (ratePerPeriod !== 0.0) {
      // Interest rate exists
      const q = (1 + ratePerPeriod) ** numberOfPayments;

      return (
        -(ratePerPeriod * (futureValue + q * presentValue)) /
        ((-1 + q) * (1 + ratePerPeriod * type))
      );
    }
    if (numberOfPayments !== 0.0) {
      // No interest rate, but number of payments exists
      return -(futureValue + presentValue) / numberOfPayments;
    }

    return 0;
  };
}
