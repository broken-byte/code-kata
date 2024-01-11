// SPDX-License-Identifier: BSD-2-Clause
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { assert } from "chai";
import { ethers } from "hardhat";


describe('Roman numerals encoder for 1 <= n < 4000', function() {
  async function deployFixture() {
    const Contract = await ethers.getContractFactory("RomanNumerals");
    const contract = await Contract.deploy();
    return contract; 
  };
  
  it('Sample Tests', async function () {
    const romanNumerals = await loadFixture(deployFixture);
    assert.equal(await romanNumerals.solution(1), 'I');
    assert.equal(await romanNumerals.solution(4), 'IV');
    assert.equal(await romanNumerals.solution(1000), 'M', 'Your function should work for the code example provided in the Description');
    assert.equal(await romanNumerals.solution(1990), 'MCMXC');
    assert.equal(await romanNumerals.solution(2007), 'MMVII');
  });
  
  it('Fixed Tests with Small Numbers', async function () {
    const romanNumerals = await loadFixture(deployFixture);
    assert.equal(await romanNumerals.solution(2), "II");
    assert.equal(await romanNumerals.solution(3), "III");
    assert.equal(await romanNumerals.solution(5), "V");
    assert.equal(await romanNumerals.solution(9), "IX");
    assert.equal(await romanNumerals.solution(10), "X");
    assert.equal(await romanNumerals.solution(11), "XI");
    assert.equal(await romanNumerals.solution(19), "XIX");
    assert.equal(await romanNumerals.solution(22), "XXII");
    assert.equal(await romanNumerals.solution(15), "XV");
  });
  it('Fixed Tests with Large Numbers', async function () {
    const romanNumerals = await loadFixture(deployFixture);
    assert.equal(await romanNumerals.solution(1001), "MI");
    assert.equal(await romanNumerals.solution(2008), "MMVIII");
  });
  it('Randomized Fixed Assertions', async function () {
    const romanNumerals = await loadFixture(deployFixture);
    var tests = [
      [1004, 'MIV'],
      [2004, 'MMIV'],
      [3003, 'MMMIII'],
      [1991, 'MCMXCI'],
      [1992, 'MCMXCII'],
      [2091, 'MMXCI'],
      [1996, 'MCMXCVI'],
      [2843, 'MMDCCCXLIII'],
      [964, 'CMLXIV'],
      [345, 'CCCXLV'],
      [979, 'CMLXXIX'],
      [746, 'DCCXLVI'],
      [390, 'CCCXC'],
      [376, 'CCCLXXVI'],
      [189, 'CLXXXIX'],
      [3888, 'MMMDCCCLXXXVIII']
    ];
    for (let i = 0; i < tests.length; i++) assert.equal(await romanNumerals.solution(tests[i][0]), tests[i][1]);
  });
});