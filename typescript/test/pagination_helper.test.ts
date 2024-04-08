import { PaginationHelper } from "../src/pagination_helper/pagination_helper_solution"
import { assert } from "chai"

describe("Pagination Helper suite", () => {

  it("sample test : 6 items with 4 per page", () => {
    const collection = ["a", "b", "c", "d", "e", "f"]
    const helper = new PaginationHelper(collection, 4)

    assert.strictEqual(helper.pageCount(), 2, "pageCount() should return the total number of pages")
    assert.strictEqual(helper.itemCount(), 6, "itemCount() should return the total number of items")

    assert.strictEqual(helper.pageItemCount(0), 4, "pageItemCount(0) should return the number of items on the first page")
    assert.strictEqual(helper.pageItemCount(1), 2, "pageItemCount(1) should return the number of items on the second page")
    assert.strictEqual(helper.pageItemCount(2), -1, "pageItemCount(2) should return -1 for an invalid page index")

    assert.strictEqual(helper.pageIndex(5), 1, "pageIndex(5) should return the page index of the item at index 5")
    assert.strictEqual(helper.pageIndex(2), 0, "pageIndex(2) should return the page index of the item at index 2")
    assert.strictEqual(helper.pageIndex(20), -1, "pageIndex(20) should return -1 for an item index that is out of range")
    assert.strictEqual(helper.pageIndex(-10), -1, "pageIndex(-10) should return -1 for a negative item index")
  })


  it("sample test : 24 items with 10 per page", () => {
    const collection = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24,
    ]
    const helper = new PaginationHelper(collection, 10)

    assert.strictEqual(helper.pageCount(), 3, "pageCount() should return the total number of pages")
    assert.strictEqual(helper.itemCount(), 24, "itemCount() should return the total number of items")

    assert.strictEqual(helper.pageItemCount(1), 10, "pageItemCount(1) should return the number of items on the second page")
    assert.strictEqual(helper.pageItemCount(2), 4, "pageItemCount(2) should return the number of items on the third page")
    assert.strictEqual(helper.pageItemCount(3), -1, "pageItemCount(3) should return -1 for an invalid page index")

    assert.strictEqual(helper.pageIndex(40), -1, "pageIndex(40) should return -1 for an item index that is out of range")
    assert.strictEqual(helper.pageIndex(22), 2, "pageIndex(22) should return the page index of the item at index 22")
    assert.strictEqual(helper.pageIndex(3), 0, "pageIndex(3) should return the page index of the item at index 3")
    assert.strictEqual(helper.pageIndex(0), 0, "pageIndex(0) should return the page index of the item at index 0")
    assert.strictEqual(helper.pageIndex(-1), -1, "pageIndex(-1) should return -1 for a negative item index")
    assert.strictEqual(helper.pageIndex(-23), -1, "pageIndex(-23) should return -1 for a negative item index")
    assert.strictEqual(helper.pageIndex(-15), -1, "pageIndex(-15) should return -1 for a negative item index")
  })

  it("empty collection", () => {
    const helper = new PaginationHelper([], 10)

    assert.strictEqual(helper.pageCount(), 0, "pageCount() should return 0 for an empty collection")
    assert.strictEqual(helper.itemCount(), 0, "itemCount() should return 0 for an empty collection")
    assert.strictEqual(helper.pageIndex(0), -1, "pageIndex(0) should return -1 for an empty collection")
    assert.strictEqual(helper.pageItemCount(0), -1, "pageItemCount(0) should return -1 for an empty collection")
  })
})
