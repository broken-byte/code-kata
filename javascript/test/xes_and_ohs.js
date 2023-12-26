const  { XO } = require("../xes_and_oes/solution.js");
const { assert } = require("chai");

describe("XO Solution function", () => {
  it(
    `should return true when the x's and o's are equal 
    (case insensitive)`, () => {
    assert.strictEqual(XO('xo'), true);
    assert.strictEqual(XO("xxOo"), true);
    assert.strictEqual(XO("xxxm"), false);
    assert.strictEqual(XO("Oo"), false);
    assert.strictEqual(XO("ooom"), false);
  });

  it(
    `should return false when the x's and o's are not equal 
    (case insensitive)`, () => {
    assert.strictEqual(XO("ooxXxx"), false);
    assert.strictEqual(XO("xooxx"), false);
    assert.strictEqual(XO("ooOo"), false);
    assert.strictEqual(XO("xxxoo"), false);
  });

  it(
    `should return true when there are no x's or o's`, () => {
      assert.strictEqual(XO(""), true);
    });

  it(
    `Should return the correct value when there are  
    x's and o's alongside other letters`, () => {
    assert.strictEqual(XO("zzoo"), false);
    assert.strictEqual(XO("zzxoo"), false);
    assert.strictEqual(XO("zzxooxx"), false);
    assert.strictEqual(XO("zzxooxxO"), true);
    assert.strictEqual(XO("zzxooxxo"), true);
    assert.strictEqual(XO("zzxooxxoO"), false);
  });
});