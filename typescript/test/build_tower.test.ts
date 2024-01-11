import { assert } from "chai";
import { towerBuilder } from "../src/build_tower/solution";

describe("towerBuilder", function () {

  it("Should build nothing for a 0 value", function () {
    assert.deepEqual(towerBuilder(0), []);
  });

  it("Should build for values between 1 and 3", function () {
    assert.deepEqual(towerBuilder(1), ["*"]);
    assert.deepEqual(towerBuilder(2), [" * ", "***"]);
    assert.deepEqual(towerBuilder(3), ["  *  ", " *** ", "*****"]);
  });

  it("Should build for values between 4 and 6", function () {
    assert.deepEqual(towerBuilder(4), ["   *   ", "  ***  ", " ***** ", "*******"]);
    assert.deepEqual(towerBuilder(5), ["    *    ", "   ***   ", "  *****  ", " ******* ", "*********"]);
    assert.deepEqual(towerBuilder(6), ["     *     ", "    ***    ", "   *****   ", "  *******  ", " ********* ", "***********"]);
  });
});
