

export class Kata {

  private static vowels = new Set(['a', 'e', 'i', 'o', 'u']);

  /**
   * Returns the count of vowels in a given string.
   * 
   * @param str - The input string.
   * @returns The count of vowels in the string.
   */
  static getCount(str: string): number {
    let count = 0;

    for (let i = 0; i < str.length; i++) {
      if (Kata.vowels.has(str[i])) {
        count++;
      }
    }

    return count;
  }
}