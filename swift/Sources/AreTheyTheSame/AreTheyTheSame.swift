/// Compares two arrays of integers and determines if they are the same
/// when the elements in the first are squared, regardless of order.
///
/// - Parameters:
///   - a: The first array of integers.
///   - b: The second array of integers.
/// - Returns: `true` if the arrays are the same when squared, `false` otherwise.
func comp(_ a: [Int], _ b: [Int]) -> Bool {
  if a.count == 0 && b.count == 0 {
    return true
  }

  if a.count != b.count {
    return false
  }

  var bCount = createCountMap(b)
  for num in a {
    let square = num * num
    if let squareCount = bCount[square] {
      if squareCount == 0 { return false }
      bCount[square]! -= 1

    } else {
      return false
    }
  }

  return true
}

private func createCountMap(_ arr: [Int]) -> [Int: Int] {
  var countMap: [Int: Int] = [:]
  for num in arr {
    if let _ = countMap[num] {
      countMap[num]! += 1
    } else {
      countMap[num] = 1
    }
  }

  return countMap
}
