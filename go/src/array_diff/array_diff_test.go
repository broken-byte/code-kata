package array_diff_test

import (
	"testing"

	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"

	. "github.com/broken-byte/code-kata/src/array_diff"
)

var _ = Describe("Sample tests", func() {
	It("should handle basic cases", func() {
		var emptyArr []int
		Expect(ArrayDiff([]int{1, 2}, []int{1})).To(Equal([]int{2}))
		Expect(ArrayDiff([]int{1, 2, 2}, []int{1})).To(Equal([]int{2, 2}))
		Expect(ArrayDiff([]int{1, 2, 2}, []int{2})).To(Equal([]int{1}))
		Expect(ArrayDiff([]int{1, 2, 2}, emptyArr)).To(Equal([]int{1, 2, 2}))
		Expect(ArrayDiff(emptyArr, []int{1, 2})).To(BeEmpty())
		Expect(ArrayDiff([]int{1, 2, 3}, []int{1, 2})).To(Equal([]int{3}))
		Expect(ArrayDiff([]int{0, 1, 2, 8, 3}, []int{3, 4, 8})).To(Equal([]int{0, 1, 2}))
	})
})

func TestArrayDiff(t *testing.T) {
	RegisterFailHandler(Fail)
	RunSpecs(t, "ArrayDiff Suite")
}
