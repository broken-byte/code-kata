package array_diff

/*
ArrayDiff takes two integer slices, 'a' and 'b', and returns a new slice
containing the elements from 'a' that are not present in 'b'.

- Time complexity: O(n*m)

- Space complexity: O(n)
*/
func ArrayDiff(a, b []int) []int {
	if len(b) == 0 {
		return a
	}

	deletion_bit_field := make([]bool, len(a))
	result := []int{}
	for i := 0; i < len(b); i++ {
		for j := 0; j < len(a); j++ {
			if a[j] == b[i] {
				deletion_bit_field[j] = true
			}
		}
	}
	for i := 0; i < len(a); i++ {
		if !deletion_bit_field[i] {
			result = append(result, a[i])
		}
	}
	return result
}
