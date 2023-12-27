

def to_jaden_case(string) -> str:
    """
    Convert a string to Jaden Case.

    Args:
        string (str): The input string.

    Returns:
        str: The Jaden Case string.

    """
    string = string.strip()
    return " ".join([word.capitalize() for word in string.split(" ")])