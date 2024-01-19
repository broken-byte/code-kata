

def delete_nth(order: list[int], max_e: int) -> list[int]:
    """
    Removes elements from the given list 'order' if they occur more than 'max_e' times.

    Args:
      order (list[int]): The input list of integers.
      max_e (int): The maximum number of times an element can occur in the list.

    Returns:
      list[int]: The modified list with elements removed if they exceed the maximum occurrence limit.
    """
    countMap: dict[int, int] = {}
    result: list[int] = []
    for num in order:
        if num not in countMap:
            countMap[num] = 1
            result.append(num)
        elif num in countMap and countMap[num] < max_e:
            countMap[num] += 1
            result.append(num)

    return result
