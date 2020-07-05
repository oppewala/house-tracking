// eslint-disable-next-line import/prefer-default-export
export const Round = (value, decimals) => {
  const multiplier = 10 ** decimals;

  return Math.round((value + Number.EPSILON) * multiplier) / multiplier;
};
