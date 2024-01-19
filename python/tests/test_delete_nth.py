import unittest
from delete_nth.solution import delete_nth


class TestDeleteNth(unittest.TestCase):

    def test_basic_cases(self):
        self.assertEqual(delete_nth([20, 37, 20, 21], 1), [
                         20, 37, 21], "From list [20, 37, 20, 21], 1 you get")
        self.assertEqual(delete_nth([1, 1, 3, 3, 7, 2, 2, 2, 2], 3), [
                         1, 1, 3, 3, 7, 2, 2, 2], "From list [1, 1, 3, 3, 7, 2, 2, 2, 2], 3 you get")
        self.assertEqual(delete_nth([1, 2, 3, 1, 1, 2, 1, 2, 3, 3, 2, 4, 5, 3, 1], 3), [
                         1, 2, 3, 1, 1, 2, 2, 3, 3, 4, 5], "From list [1, 2, 3, 1, 1, 2, 1, 2, 3, 3, 2, 4, 5, 3, 1], 3 you get")
        self.assertEqual(delete_nth([1, 1, 1, 1, 1], 5), [
                         1, 1, 1, 1, 1], "From list [1, 1, 1, 1, 1], 5 you get")
        self.assertEqual(delete_nth([], 5), [], "From list [], 5 you get")


if __name__ == "__main__":
    unittest.main()
