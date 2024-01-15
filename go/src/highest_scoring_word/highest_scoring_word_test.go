package highest_scoring_word_test

import (
	"fmt"
	"testing"

	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"

	. "github.com/broken-byte/code-kata/src/highest_scoring_word"
)

var _ = Describe("Example tests",func() {
    arr := [...][2]string{
        {"man i need a taxi up to ubud","taxi"},
        {"what time are we climbing up the volcano","volcano"},
        {"take me to semynak","semynak"},
        {"aa b", "aa"},
        {"b aa", "b"},
        {"bb d", "bb"},
        {"d bb", "d"},
        {"aaa b", "aaa"},
    }
    for _,v := range arr {
        var input = v[0]
        var output = v[1] 
        It(fmt.Sprintf("Testing input \"%s\"",input),func() {Expect(High(input)).To(Equal(output))})
    }
})

func TestHighestWord(t *testing.T) {
	RegisterFailHandler(Fail)
	RunSpecs(t, "Highest Word Suite")
}