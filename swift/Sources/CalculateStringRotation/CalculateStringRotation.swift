import Foundation

/*
  receives two strings and returns n,
  where n is equal to the number of characters we should shift the first string forward to match the second.
  The check should be case sensitive.

  Time complexity: O(n)
  Space complexity: O(n)
  where n is the length of the string
*/
func shiftedDiff(_ first: String, _ second: String) -> Int? {
  guard first.count == second.count else { return nil }

  let doubledSecond = second + second
  if let range = doubledSecond.range(of: first) {
    return doubledSecond.distance(from: doubledSecond.startIndex, to: range.lowerBound)
  }

  return nil
}
