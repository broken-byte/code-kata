

/**
 * Filters an array of friends and returns only the ones with a name length of 4.
 * @param {string[]} friends - The array of friends.
 * @returns {string[]} - The filtered array of friends.
 */
export const friend = (friends) => {
  return friends.filter((friend) => friend.length === 4);
}

