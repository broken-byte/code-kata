import XCTest

@testable import StreetFighterCharacterSelection

class StreetFighterCharacterSelectionTests: XCTestCase {
  static let fighters = [
    ["Ryu", "E.Honda", "Blanka", "Guile", "Balrog", "Vega"],
    ["Ken", "Chun Li", "Zangief", "Dhalsim", "Sagat", "M.Bison"],
  ]

  static let characterTest: [(String, (row: Int, column: Int), [Direction], [String])] = [
    ("Should work with no selection cursor moves", (0, 0), [], []),
    (
      "Should work with few moves", (0, 0), [.up, .left, .right, .left, .left],
      ["Ryu", "Vega", "Ryu", "Vega", "Balrog"]
    ),
    (
      "Should work when always moving left", (0, 0),
      [.left, .left, .left, .left, .left, .left, .left, .left],
      ["Vega", "Balrog", "Guile", "Blanka", "E.Honda", "Ryu", "Vega", "Balrog"]
    ),
    (
      "Should work when always moving right", (0, 0),
      [.right, .right, .right, .right, .right, .right, .right, .right],
      ["E.Honda", "Blanka", "Guile", "Balrog", "Vega", "Ryu", "E.Honda", "Blanka"]
    ),
    (
      "Should use all 4 directions clockwise twice", (0, 0),
      [.up, .left, .down, .right, .up, .left, .down, .right],
      ["Ryu", "Vega", "M.Bison", "Ken", "Ryu", "Vega", "M.Bison", "Ken"]
    ),
    (
      "Should work when always moving down", (0, 0), [.down, .down, .down, .down],
      ["Ken", "Ken", "Ken", "Ken"]
    ),
    (
      "Should work when always moving up", (0, 0), [.up, .up, .up, .up],
      ["Ryu", "Ryu", "Ryu", "Ryu"]
    ),
  ]

  func testCharacterSelection() {
    for test in StreetFighterCharacterSelectionTests.characterTest {
      XCTAssertEqual(
        streetFighterSelection(
          fighters: StreetFighterCharacterSelectionTests.fighters, position: test.1, moves: test.2),
        test.3, test.0)
    }
  }
}
