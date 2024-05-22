// SPDX-License-Identifier: BSD-2-Clause
pragma solidity ^0.8.16;

/*
 * @title Roman Numerals
 * @dev Convert integers to Roman numerals
 */
contract RomanNumerals {
  /*
   * @dev Convert integer to Roman numeral
   * @param n Integer to convert
   * @return Roman numeral as string
   *
   * E.g. 1990 -> "MCMXC"
   *
   * Time complexity: O(13) -> O(1)
   * Space complexity: O(13) -> O(1)
   */
  function solution(uint n) public pure returns (string memory) {
    string[13] memory symbols = [
      "I",
      "IV",
      "V",
      "IX",
      "X",
      "XL",
      "L",
      "XC",
      "C",
      "CD",
      "D",
      "CM",
      "M"
    ];
    uint16[13] memory values = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];

    string memory result = "";
    uint i = values.length;
    while (i > 0) {
      i--;
      while (n >= values[i]) {
        // String concatentation.
        result = string(abi.encodePacked(result, symbols[i]));
        n -= values[i];
      }
    }
    return result;
  }
}
