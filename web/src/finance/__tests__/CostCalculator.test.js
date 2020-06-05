import { CostsCalculator } from '../CostsCalculator';

it('should calculate stamp duty', () => {
  expect(CostsCalculator.StampDuty(0, false)).toEqual(0);
  expect(CostsCalculator.StampDuty(100000, false)).toEqual(1070);
  expect(CostsCalculator.StampDuty('100000', false)).toEqual(1070);
  expect(CostsCalculator.StampDuty(600000, false)).toEqual(31070);
  expect(CostsCalculator.StampDuty(650000, false)).toEqual(34070);
  expect(CostsCalculator.StampDuty(700000, false)).toEqual(37070);
  expect(CostsCalculator.StampDuty(750000, false)).toEqual(40070);
  expect(CostsCalculator.StampDuty('750000', false)).toEqual(40070);
});

it('should calculate stamp duty for first home buyers', () => {
  expect(CostsCalculator.StampDuty(0, true)).toEqual(0);
  expect(CostsCalculator.StampDuty(100000, true)).toEqual(0);
  expect(CostsCalculator.StampDuty('100000', true)).toEqual(0);
  expect(CostsCalculator.StampDuty(600000, true)).toEqual(0);
  expect(CostsCalculator.StampDuty(650000, true)).toEqual(11356.67);
  expect(CostsCalculator.StampDuty(700000, true)).toEqual(24713.33);
  expect(CostsCalculator.StampDuty(750000, true)).toEqual(40070);
  expect(CostsCalculator.StampDuty('750000', true)).toEqual(40070);
});

it('should calculate transfer fee', () => {
  expect(CostsCalculator.TransferFee(100000)).toEqual(332.5);
  expect(CostsCalculator.TransferFee(1000000)).toEqual(2438.5);
  expect(CostsCalculator.TransferFee('1000000')).toEqual(2438.5);
});

it('should calculate total costs', () => {
  expect(CostsCalculator.TotalCosts(100, 200, 400, 800)).toEqual(1500);
  expect(CostsCalculator.TotalCosts('100', 200, 400, 800)).toEqual(1500);
  expect(CostsCalculator.TotalCosts(100, '200', 400, 800)).toEqual(1500);
  expect(CostsCalculator.TotalCosts(100, 200, '400', 800)).toEqual(1500);
  expect(CostsCalculator.TotalCosts(100, 200, 400, '800')).toEqual(1500);
  expect(CostsCalculator.TotalCosts('100', '200', '400', '800')).toEqual(1500);
});

it('should calculate minimum deposit', () => {
  expect(CostsCalculator.MinimumDeposit(100000, 150000)).toEqual(70000);
  expect(CostsCalculator.MinimumDeposit(850000, 898287.5)).toEqual(218287.5);
});

it('should calculate monthly repayments', () => {
  expect(CostsCalculator.RepaymentsMonthly(0.03, 30, 678287.5)).toEqual(-2859.69);
});
