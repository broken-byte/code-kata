

/**
 * Checks if the number of 'X's is equal to the number of 'O's 
 * in a given string.
 * 
 * @param {string} str - The input string to check.
 * @returns {boolean} - Returns true if the number of 'X's is 
 *  equal to the number of 'O's, otherwise returns false.
 */
export const XO = (str) => {
  const xCount = (str.match(/x/gi) || []).length;
  const oCount = (str.match(/o/gi) || []).length;
  return xCount === oCount;
};
