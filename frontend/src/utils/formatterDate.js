export const formatterDate = (date, config) => {
  const defaultConfig = { day: "numeric", month: "long", year: "numeric" };
  const options = config || defaultConfig;
  return new Date(date).toLocaleDateString("en-US", options);
};
