

/**
 * Builds a tower of asterisks with a specified number of floors.
 * 
 * @param nFloors - The number of floors in the tower.
 * @returns An array of strings representing the tower.
 * 
 * @timecomplexity O(n^2)
 * @spacecomplexity O(n^2)
 * 
 * @example
 * towerBuilder(0); // []
 * towerBuilder(1); // ["*"]
 * towerBuilder(2); // [" * ", "***"]
 * towerBuilder(3); // ["  *  ", " *** ", "*****"]
 */
export const towerBuilder =
  (nFloors: number): string[] => {
    if (nFloors === 0) {
      return [];
    }

    let maxLength = nFloors * 2 - 1;
    let result = new Array(nFloors).fill("");
    let floorBuffer = new Array(maxLength).fill(" ");
    for (
      let floorNumber = 0;
      floorNumber < nFloors;
      floorNumber++
    ) {
      result[floorNumber] =
        buildFloor(nFloors, floorNumber, floorBuffer);
    }
    return result;
  }


/**
 * Builds a floor of a tower.
 * 
 * @param nFloors - The total number of floors in the tower.
 * @param floorNumber - The number of the current floor being built.
 * @param buffer - The buffer array to store the characters of the floor.
 * @returns The string representation of the built floor.
 */
const buildFloor = (
  nFloors: number,
  floorNumber: number,
  buffer: string[]
): string => {
  let maxLength = nFloors * 2 - 1;
  let i = 0; let j = maxLength - 1;
  let spaceI = nFloors - floorNumber - 1;
  let spaceJ = nFloors - floorNumber - 1;
  while (i <= j) {
    if (spaceI > 0) {
      buffer[i] = " ";
      spaceI--;
    } else {
      buffer[i] = "*";
    }

    if (spaceJ > 0) {
      buffer[j] = " ";
      spaceJ--;
    } else {
      buffer[j] = "*";
    }
    i++; j--;
  }
  return buffer.join("");
}



