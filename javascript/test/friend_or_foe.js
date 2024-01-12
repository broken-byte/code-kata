import chai from "chai";
import { friend } from "../src/friend_or_foe/solution.js";
const { assert } = chai;
chai.config.truncateThreshold = 0;

describe("Basic tests", () => {

  it("Should find friends given alphabetic array inputs", () => {
    assert.deepEqual(friend(["Ryan", "Kieran", "Mark"]), ["Ryan", "Mark"]);
    assert.deepEqual(friend(["Jimm", "Cari", "aret", "truehdnviegkwgvke", "sixtyiscooooool"]), ["Jimm", "Cari", "aret"]);
  });

  it("Should find friends given alphanumeric array inputs", () => {
    assert.deepEqual(friend(["Ryan", "Jimmy", "123", "4", "Cool Man"]), ["Ryan"]);
    assert.deepEqual(friend(["Love", "Your", "Face", "1"]), ["Love", "Your", "Face"]);
  });
});
