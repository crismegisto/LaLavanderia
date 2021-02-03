/**
 * @return {boolean} true if the string contains prohibited terms
 */
const checkString = (str) => {
  if (!str) {
    return false;
  }

  const forbiddenStrings = ['apartamento', 'apto', 'piso'];
  const contains = forbiddenStrings.some((item) =>
    str.toLowerCase().includes(item),
  );
  return contains;
};

export default checkString;
