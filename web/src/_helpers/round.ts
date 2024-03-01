export const Round = (value: number, decimals: number) => {
  const multiplier = 10 ** decimals;

  return Math.round((value + Number.EPSILON) * multiplier) / multiplier;
};
