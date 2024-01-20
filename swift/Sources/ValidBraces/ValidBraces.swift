import Foundation

/*
 Determines whether a string contains valid braces.
 - Parameter string: The input string to check.
 - Returns: `true` if the string contains valid braces, `false` otherwise.

 - Time Complexity: O(n)
 - Space Complexity: O(n)
*/
func validBraces(_ string: String) -> Bool {
  var stack: [String] = []
  for brace in string {
    if brace == "(" || brace == "{" || brace == "[" {
      stack.append(String(brace))
    }

    if brace == ")" {
      if stack.popLast() != "(" {
        return false
      }
    } else if brace == "}" {
      if stack.popLast() != "{" {
        return false
      }
    } else if brace == "]" {
      if stack.popLast() != "[" {
        return false
      }
    }
  }

  return stack.isEmpty
}
