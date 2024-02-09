import XCTest

@testable import CalculateStringRotation

class SolutionTest: XCTestCase {
  static var allTests = [
    ("Basic Test", testing)
  ]

  func testing() {
    XCTAssertEqual(shiftedDiff("fatigue", "tiguefa"), 5, "expected 5")
    XCTAssertEqual(shiftedDiff("coffee", "eecoff"), 2, "expected 2")
    XCTAssertEqual(shiftedDiff("eecoff", "coffee"), 4, "expected 4")
    XCTAssertEqual(shiftedDiff("isn't", "'tisn"), 2, "expected 2")
    XCTAssertEqual(shiftedDiff("Esham", "Esham"), 0, "expected 0")
    XCTAssertNil(shiftedDiff("moose", "Moose"), "expected nil")
    XCTAssertNil(shiftedDiff("dog", "god"), "expected nil")
  }
}
