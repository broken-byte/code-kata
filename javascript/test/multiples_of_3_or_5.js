import { assert } from "chai";
import { solution } from "../src/multiples_of_3_or_5/solution.js";


const test = (n, expected) => {
  it(`n=${n}`, () => {
    let actual = solution(n);
    assert.strictEqual(actual, expected);
  });
};


describe("basic tests", () => {
  test(10, 23);
  test(-10, 0);
  test(16, 60);
  test(100, 2318);
});
