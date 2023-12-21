const { assert } = require("chai");
const { solution } = require("../multiples_of_3_or_5/solution.js");


function test(n, expected) {
  it(`n=${n}`, () => {
    let actual = solution(n)
    assert.strictEqual(actual, expected)
  })
}


describe("basic tests", function () {
  test(10, 23)
  test(-10, 0)
  test(16, 60)
  test(100, 2318)
})