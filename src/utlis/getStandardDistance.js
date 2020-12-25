export const getStandardDistance = (distance) => {
  const miles = distance / 1609.344;
  return miles.toFixed(2);
};
