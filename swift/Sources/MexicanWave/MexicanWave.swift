public func wave(_ sourceString: String) -> [String] {
  if sourceString.isEmpty {
    return []
  }

  var result = [String]()

  let iterations = sourceString.count
  var charPointer = 0
  for _ in 0..<iterations {
    let stringIndex: String.Index = sourceString.index(
      sourceString.startIndex, offsetBy: charPointer)
    let currentChar: Character = sourceString[stringIndex]
    if currentChar == " " {
      charPointer += 1
      continue
    }
    let mexicanWaveWord = getMexicanWavedWord(originalWord: sourceString, stringIndex: stringIndex)
    result.append(mexicanWaveWord)
    charPointer += 1
  }

  return result
}

func getMexicanWavedWord(originalWord: String, stringIndex: String.Index) -> String {
  let mexicanWaveChar = Character(String(originalWord[stringIndex]).uppercased())
  let mexicanWaveWord = originalWord.getNewStringWithReplacedCharacter(
    at: stringIndex, with: mexicanWaveChar)
  return mexicanWaveWord
}

extension String {
  func getNewStringWithReplacedCharacter(at index: String.Index, with newChar: Character) -> String
  {
    let intIndex = self.distance(from: self.startIndex, to: index)
    var chars = Array(self)  // convert string to array of characters
    chars[intIndex] = newChar  // replace the character at the specified index
    let modifiedString = String(chars)  // convert the array of characters back to a string
    return modifiedString
  }
}

func waveV2(_ y: String) -> [String] {

  let array = y.map { String($0) }  //["h", "e", "l", "l", "0"]
  var result = [String]()

  for (index, item) in array.enumerated() {

    if item == " " { continue }

    var word = array
    word[index] = item.uppercased()
    result.append(word.joined())
  }

  return result
}
