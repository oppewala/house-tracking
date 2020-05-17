export class CostsCalculator {
    static StampDuty = (housePrice) => {
        return 2870+(housePrice-130000)*0.06;
    }

    static TransferFee = (housePrice) => 98.5+(housePrice/1000)*2.34;

    static TotalCosts = (housePrice, stampDuty, transferFee, applicationFee) =>
        housePrice + stampDuty + transferFee + applicationFee;

    static MinimumDeposit = (housePrice, totalCost) => (0.2 * housePrice) + totalCost - housePrice;

    static RepaymentsMonthly = (interestRate, loanLength, loanValue) =>
    {
        return CostsCalculator.PMT(
            interestRate / 12,
            loanLength * 12,
            loanValue,
            0,
            0)
    }

    // From stackoverflow
    // https://stackoverflow.com/questions/2094967/excel-pmt-function-in-js/6088618
    static PMT = (rate_per_period, number_of_payments, present_value, future_value, type) => {
        if(rate_per_period != 0.0){
            // Interest rate exists
            var q = Math.pow(1 + rate_per_period, number_of_payments);
            return -(rate_per_period * (future_value + (q * present_value))) / ((-1 + q) * (1 + rate_per_period * (type)));

        } else if(number_of_payments != 0.0){
            // No interest rate, but number of payments exists
            return -(future_value + present_value) / number_of_payments;
        }

        return 0;
    }
}

export default CostsCalculator