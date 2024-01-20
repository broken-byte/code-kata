import XCTest

@testable import ValidBraces

class SolutionTest: XCTestCase {
  static var allTests = [
    ("testNonNested", testNonNested),
    ("testNested", testNested),
  ]

  func testNonNested() {
    XCTAssertTrue(validBraces("()"))
    XCTAssertTrue(validBraces("[]"))
    XCTAssertTrue(validBraces("{}"))
    XCTAssertTrue(validBraces("(){}[]"))
  }

  func testNested() {
    XCTAssertTrue(validBraces("([{}])"))
    XCTAssertFalse(validBraces("(}"))
    XCTAssertFalse(validBraces("[(])"))
    XCTAssertTrue(validBraces("({})[({})]"))
    XCTAssertFalse(validBraces("(})"))
    XCTAssertTrue(validBraces("(({{[[]]}}))"))
    XCTAssertTrue(validBraces("{}({})[]"))
    XCTAssertFalse(validBraces(")(}{]["))
    XCTAssertFalse(validBraces("())({}}{()][]["))
    XCTAssertFalse(validBraces("(((({{"))
    XCTAssertFalse(validBraces("}}]]))}])"))
  }
}
