package highest_scoring_word

import "strings"

func High(s string) string {
		wordArr := strings.Split(s, " ")
		var highestWord string = wordArr[0]
		highestWordIndex := 0
		for index, currentWord := range wordArr {
			highestWord = getHighest(highestWord, highestWordIndex, currentWord, index)
		}
		return highestWord
}

func getHighest(highestWord string, highestWordIndex int, currentWord string, currentIndex int) string {
	currentHighScore := getScore(highestWord)
	currentWordScore := getScore(currentWord)
	if currentWordScore > currentHighScore {
		return currentWord
	} else if currentWordScore == currentHighScore {
		if currentIndex <= highestWordIndex {
			return currentWord
		} else {
			return highestWord
		}
	} else {
		return highestWord
	}
}

func getScore(word string) int {
	valueMap := map[string]int{
		"a": 1,
		"b": 2,
		"c": 3,
		"d": 4,
		"e": 5,
		"f": 6,
		"g": 7,
		"h": 8,
		"i": 9,
		"j": 10,
		"k": 11,
		"l": 12,
		"m": 13,
		"n": 14,
		"o": 15,
		"p": 16,
		"q": 17,
		"r": 18,
		"s": 19,
		"t": 20,
		"u": 21,
		"v": 22,
		"w": 23,
		"x": 24,
		"y": 25,
		"z": 26,
	}
	score := 0
	for _, letter := range word {
		score += valueMap[string(letter)]
	}
	return score
}