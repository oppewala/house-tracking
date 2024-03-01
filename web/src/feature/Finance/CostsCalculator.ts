export class CostsCalculator {
  static StampDuty = (housePrice: number, firstHomeBuyer: boolean) => {
    if (firstHomeBuyer && housePrice <= 600000) return 0;

    const stampDuty = 2870 + (Number(housePrice) - 130000) * 0.06;
    if (!firstHomeBuyer) return Math.max(stampDuty, 0);

    const stampDutyFHBDiscount = (stampDuty * (housePrice - 600000)) / 150000;
    return Math.round((Math.min(stampDutyFHBDiscount, stampDuty) + Number.EPSILON) * 100) / 100;
  };

  static TransferFee = (housePrice: number) => 98.5 + (housePrice / 1000) * 2.34;

  static TotalCosts = (housePrice: number, stampDuty: number, transferFee: number, applicationFee: number, incidentalCosts: number) => {
    return (
      Number(housePrice) +
      Number(stampDuty) +
      Number(transferFee) +
      Number(applicationFee) +
      Number(incidentalCosts)
    );
  };

  static MinimumDeposit = (housePrice: number, totalCost: number) =>
    0.2 * Number(housePrice) + Number(totalCost) - Number(housePrice);

  static RepaymentsMonthly = (interestRate: number, loanLength: number, loanValue: number) => {
    // eslint-disable-next-line
    if (interestRate > 0.2) console.warn('Interest rate above 20% - potentially unexpected');

    const repayments = CostsCalculator.PMT(
      interestRate / 12, // Interest Rate is annual, convert to months
      loanLength * 12, // Mortgage Length is in years, convert to months
      loanValue,
      0,
      0,
    );
    return Math.round((repayments + Number.EPSILON) * 100) / 100;
  };

  // From stackoverflow
  // https://stackoverflow.com/questions/2094967/excel-pmt-function-in-js/6088618
  static PMT = (ratePerPeriod: number, numberOfPayments: number, presentValue: number, futureValue: number, type: number) => {
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

  static Savings = (deposit: number, isFirstHomeBuyerEligible: boolean | undefined | null) =>
    Number(deposit) + (isFirstHomeBuyerEligible ? 10000 : 0);

  static lmi = (lvr: number) => {
    if (lvr < 0.8) return 0;
    if (lvr < 0.9) return 0.02;
    if (lvr < 0.095) return 0.04;
    return 0.1;
  };
}
