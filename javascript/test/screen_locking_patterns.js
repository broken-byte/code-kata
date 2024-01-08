import { assert } from "chai";
import { countPatternsFrom } from "../screen_locking_patterns/solution.js";

describe("countPatterns Tests", () => {
  it("should count patterns for length 0, less than 0, or more than 9 as 0", () => {
    assert.strictEqual(countPatternsFrom('A', 10), 0);
    assert.strictEqual(countPatternsFrom('A', -1), 0);
    assert.strictEqual(countPatternsFrom('A', 0), 0);
  });

  it("should count patterns for small lengths", () => {
    assert.strictEqual(countPatternsFrom('B', 1), 1);
    assert.strictEqual(countPatternsFrom('C', 2), 5);
    assert.strictEqual(countPatternsFrom('D', 3), 37);
  });

  it("should count patterns for longer lengths", () => {
    assert.strictEqual(countPatternsFrom('E', 4), 256);
    assert.strictEqual(countPatternsFrom('E', 8), 23280);
  });
});