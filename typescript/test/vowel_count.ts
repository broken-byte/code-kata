import { Kata } from "../vowel_count/solution";
import { assert } from "chai";

describe("getCount", function () {

  it("should pass alphabetical inputs", function () {
    assert.strictEqual(Kata.getCount("abracadabra"), 5)
    assert.strictEqual(Kata.getCount("pear tree"), 4)
  });

  it("should pass empty string", function () {
    assert.strictEqual(Kata.getCount(""), 0)
  });

  it("Should pass alphanumeric inputs", function () {
    assert.strictEqual(Kata.getCount("pear tree 123"), 4)
  });
});