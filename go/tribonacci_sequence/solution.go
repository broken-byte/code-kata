package tribonacci

/*
Tribonacci calculates the Tribonacci sequence up to the given length.
It takes an initial signature array of 3 float64 values and the desired length of the sequence.
Returns a slice of float64 values representing the Tribonacci sequence.

- Time complexity: O(n)
- Space complexity: O(n)
*/
func Tribonacci(signature [3]float64, n int) (result []float64) {
	if n == 0 {
		return []float64{}
	}

	if n == 1 {
		return signature[:1]
	}

	if n == 2 {
		return signature[:2]
	}

	if n == 3 {
		return signature[:]
	}

	result = make([]float64, 0, n)
	// Append empty result array to the end of signature array.
	result = append(result, signature[:]...)
	for i := 3; i < n; i++ {
		result = append(
			result,
			result[i-3]+
				result[i-2]+
				result[i-1],
		)
	}
	return result
}
