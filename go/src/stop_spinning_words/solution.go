package stop_spinning_words

import "strings"

/*
SpinWords takes a string as input and returns a new string where words with five or more characters are reversed.
Words with less than five characters remain unchanged.

- O(n) time complexity.

- O(n) space complexity.
*/
func SpinWords(str string) string {
	words := strings.Split(str, " ")
	for i := 0; i < len(words); i++ {
		if len(words[i]) >= 5 {
			words[i] = reverse(words[i])
		}
	}

	return strings.Join(words, " ")
}

// reverse takes a string as input and returns the reversed version of the string.
func reverse(str string) string {
	var reversed string = ""
	for i := len(str) - 1; i >= 0; i-- {
		reversed += string(str[i])
	}
	return reversed
}
