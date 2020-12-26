export const getStandardTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;

  return !!minutes ? `${minutes}:${seconds}` : `${seconds}s`;
};

export default getStandardTime;
