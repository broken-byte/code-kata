import unittest
from to_jaden_case.solution import to_jaden_case


class TestToJadenCase(unittest.TestCase):

    def test_basic_cases(self):
        quote = "How can mirrors be real if our eyes aren't real"
        self.assertEqual(
            to_jaden_case(quote),
            "How Can Mirrors Be Real If Our Eyes Aren't Real"
        )

    def test_empty_string(self):
        self.assertEqual(to_jaden_case(""), "")

    def test_one_word(self):
        self.assertEqual(to_jaden_case("word"), "Word")

    def test_one_word_with_space(self):
        self.assertEqual(to_jaden_case(" word"), "Word")


if __name__ == '__main__':
    unittest.main()
