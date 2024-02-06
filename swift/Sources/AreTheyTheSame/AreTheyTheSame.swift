/// Compares two arrays of integers and determines if they are the same when squared.
///
/// - Parameters:
///   - a: The first array of integers.
///   - b: The second array of integers.
/// - Returns: `true` if the arrays are the same when squared, `false` otherwise.
func comp(_ a: [Int], _ b: [Int]) -> Bool {
  if a.count == 0 || b.count == 0 {
    return false
  }

  if a.count != b.count {
    return false
  }

  if a.count == 0 && b.count == 0 {
    return true
  }

  var bCount = createCountMap(b)
  for num in a {
    if let squareCount = bCount[num ^ 2] {
      if squareCount == 0 { return false }
      bCount[num ^ 2]! -= 1

    } else {
      return false
    }
  }

  return true
}

func createCountMap(_ arr: [Int]) -> [Int: Int] {
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
