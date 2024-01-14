package stop_spinning_words_test

import (
	"testing"

	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"

	. "github.com/broken-byte/code-kata/src/stop_spinning_words"
)

var _ = Describe("Test Sample", func() {

	It("should test that the solution returns the correct value for single word inputs", func() {
		Expect(SpinWords("Welcome")).To(Equal("emocleW"))
		Expect(SpinWords("to")).To(Equal("to"))
		Expect(SpinWords("CodeWars")).To(Equal("sraWedoC"))
	})

	It("should test that the solution returns the correct value for multiple word outputs", func() {
		Expect(SpinWords("Hey fellow warriors")).To(Equal("Hey wollef sroirraw"))
		Expect(SpinWords("Burgers are my favorite fruit")).To(Equal("sregruB are my etirovaf tiurf"))
		Expect(SpinWords("Pizza is the best vegetable")).To(Equal("azziP is the best elbategev"))
	})

	It("should test that the solution returns the correct value for long inputs", func() {
		Expect(SpinWords("This is another test")).To(Equal("This is rehtona test"))
		Expect(SpinWords("You are almost to the last test")).To(Equal("You are tsomla to the last test"))
		Expect(SpinWords("Just kidding there is still one more")).To(Equal("Just gniddik ereht is llits one more"))
		Expect(SpinWords("Seriously this is the last one")).To(Equal("ylsuoireS this is the last one"))
	})

	It("should test that the solution returns an empty array for empty inputs", func() {
		Expect(SpinWords("")).To(Equal(""))
	})
})

func TestSpinWords(t *testing.T) {
	RegisterFailHandler(Fail)
	RunSpecs(t, "Spin Words Suite")
}
