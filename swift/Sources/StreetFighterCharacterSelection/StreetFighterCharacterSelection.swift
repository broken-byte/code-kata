/// Enum representing the directions in a Street Fighter character selection.
///
/// - up: Represents the up direction.
/// - down: Represents the down direction.
/// - left: Represents the left direction.
/// - right: Represents the right direction.
enum Direction: String {
  case up = "up"
  case down = "down"
  case left = "left"
  case right = "right"
}

/// Selects the characters in a Street Fighter game based on the given moves.
///
/// - Parameters:
///     - fighters: A 2D array representing the grid of fighters.
///     - position: The initial position of the selection cursor.
///     - moves: An array of directions representing the moves to be made.
///
/// - Returns: An array of strings representing the characters selected during the moves.
func streetFighterSelection(
  fighters: [[String]],
  position: (row: Int, column: Int),
  moves: [Direction]
) -> [String] {

  let directionMapping: [Direction: [Int]] = [
    Direction.up: [-1, 0],
    Direction.down: [1, 0],
    Direction.left: [0, -1],
    Direction.right: [0, 1],
  ]

  var currentPosition = [position.row, position.column]
  var path: [String] = []

  for move in moves {
    if let direction = directionMapping[move] {

      let testMoveX = currentPosition[1] + direction[1]
      let testMoveY = currentPosition[0] + direction[0]

      if testMoveX < 0 {  // Horizontal Cycle left check
        currentPosition[1] = fighters[0].count - 1
      } else if testMoveX > fighters[0].count - 1 {  // Horizontal Cycle right check
        currentPosition[1] = 0
      } else {
        currentPosition[1] = testMoveX
      }

      // Vertical Cycle (i.e. non-move) up or down check
      if testMoveY < 0 || testMoveY > 1 {
        currentPosition[0] = currentPosition[0]  // Do nothing
      } else {
        currentPosition[0] = testMoveY
      }

      let currentFigher: String = fighters[currentPosition[0]][currentPosition[1]]

      path.append(currentFigher)

    } else {
      // Handle the case where 'move' is not a valid key in the dictionary
      print("Invalid move: \(move)")
    }

  }

  return path
}
