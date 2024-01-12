

/**
 * Counts the number of screen lock patterns that can be formed starting from a given point and with a specified length.
 *
 * @param {string} firstPoint - The starting point of the pattern.
 * @param {number} length - The length of the pattern.
 * 
 * @returns {number} - The number of screen lock patterns that meet the rules and length.
 */
export const countPatternsFrom = (firstPoint, length) => {
  // validate input for edge cases.
  if (length < 1 || length > 9) {
    return 0;
  }

  // Key is the point, value is an array of neighbors that can be visited.
  const graph = {
    'A': ['B', 'D', 'E', 'H', 'F'],
    'B': ['A', 'C', 'E', 'D', 'F', 'I', 'G'],
    'C': ['B', 'E', 'F', 'H', 'D'],
    'D': ['A', 'B', 'E', 'C', 'G', 'H', 'I'],
    'E': ['B', 'A', 'C', 'D', 'F', 'G', 'H', 'I'],
    'F': ['C', 'B', 'A', 'E', 'G', 'H', 'I'],
    'G': ['D', 'H', 'B', 'F', 'E'],
    'H': ['G', 'I', 'D', 'E', 'F', 'A', 'C'],
    'I': ['E', 'H', 'F', 'B', 'D'],
}

  // Key is the point, 
  // the value is an object of points that can be skipped over, 
  // and each nested value is the final destination.
  const skippedOverPointMappings = {
    'G': { 'D': 'A', 'E': 'C', 'H': 'I' },
    'D': { 'E': 'F' },
    'A': { 'B': 'C', 'E': 'I', 'D': 'G' },
    'B': { 'E': 'H' },
    'H': { 'E': 'B' },
    'C': { 'B': 'A', 'E': 'G', 'F': 'I' },
    'F': { 'E': 'D' },
    'I': { 'H': 'G', 'F': 'C', 'E': 'A' }
  }

  /**
   * Traverses the graph to calculate the number of possible patterns for screen locking.
   * @param {String} currentPoint - The current point in the graph.
   * @param {number} remainingLength - The remaining length of the pattern.
   * @param {Object<String, Boolean>} visited - The object of visited points.
   * 
   * @returns {Array<Object<String, Boolean>> || Object<String, Boolean>}
   *  - An array of visited objects. or a visited object.
   */
  const getPossiblePatterns = 
    (currentPoint, remainingLength, visited) => {
    if (remainingLength === 0) {
      return [visited];
    }
    visited[currentPoint] = true;
    let visitedArray = [];
    for (const neighbor of graph[currentPoint]) {
      if (!visited[neighbor]) {
        visitedArray = visitedArray.concat(
          getPossiblePatterns(neighbor, remainingLength - 1, { ...visited })
        )
      } else {
        const skipMappingFromCurrentPoint = 
          skippedOverPointMappings[currentPoint]
        if (skipMappingFromCurrentPoint === undefined) continue;
        const destinationPointAfterSkip = 
          skipMappingFromCurrentPoint[neighbor]
        if (destinationPointAfterSkip !== undefined &&
          !visited[destinationPointAfterSkip])
          visitedArray = visitedArray.concat(
            getPossiblePatterns(
              destinationPointAfterSkip,
              remainingLength - 1,
              { ...visited },
            )
          )
      }
    }
    return visitedArray;
  }

  return getPossiblePatterns(firstPoint, length - 1, {}).length;
};
