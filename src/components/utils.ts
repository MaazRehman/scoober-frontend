/**
 * Type representing the result of a calculation.
 *
 * @typedef {Object} CalculateRecordResult
 * @property {number} step - The step value used in the calculation.
 * @property {string} equation - The equation used to calculate the result.
 * @property {number} result - The result of the calculation.
 * @property {string} username - The username of the player who made the calculation.
 */
export type CalculateRecordResult = {
  step: number;
  equation: string;
  result: number;
  username: string;
};

/**
 * Calculates the record based on the given number, selected number, and username.
 *
 * @param {number} number - The number to be used in the calculation.
 * @param {number} selectedNumber - The selected number (must be one of: 1, 0, -1).
 * @param {string} username - The username of the player making the calculation.
 * @returns {CalculateRecordResult} - The result of the calculation.
 * @throws Will throw an error if the selectedNumber is not one of: 1, 0, -1 or if the number is not an integer.
 */
export const calculateRecord = (
  number: number,
  selectedNumber: number,
  username: string
): CalculateRecordResult => {
  if (![1, 0, -1].includes(selectedNumber)) {
    throw new Error(
      'The selectedNumber must be one of the following: 1, 0, -1'
    );
  }

  if (!Number.isInteger(number)) {
    throw new Error('The number must be a whole number');
  }

  const step: number = selectedNumber;
  const isDivisibleBy3: boolean = (number + step) % 3 === 0;
  const result: number = isDivisibleBy3 ? (number + step) / 3 : number;

  const equation: string = `[ ( ${number} + ${step}) / 3 ] = ${isDivisibleBy3 ? result : number}`;

  return {
    step,
    equation,
    result,
    username,
  };
};
