

export function isNarcissistic(value: number): boolean {
  const numberOfDigits = countDigits(value);
  const individualNumbers = separateDigitsIntoIndividualNumbers(value);

  const raisedSummation = 
    individualNumbers
      .map(number => Math.pow(number, numberOfDigits))
      .reduce((a, b) => a + b, 0);;

  return raisedSummation === value;
}

function countDigits(n: number): number {
  return Math.floor(Math.log10(Math.abs(n))) + 1;
}

function separateDigitsIntoIndividualNumbers(n: number): number[] {
  let digits = [];
  while (n > 0) {
      digits.push(n % 10);
      n = Math.floor(n / 10);
  }
  return digits
}
