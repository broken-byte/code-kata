package array_diff_test

import (
	"testing"

	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
)

func TestArrayDiff(t *testing.T) {
	RegisterFailHandler(Fail)
	RunSpecs(t, "ArrayDiff Suite")
}
