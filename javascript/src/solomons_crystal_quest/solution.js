

/**
 * Solomons Crystal Quest
 * @param {Array<Array<number>>} 
 * 	ar - the Map to Golomon, with each element being an array of 3 numbers
 * 	[timeLayerShift, direction, distance]
 * @returns {Array<number>} 
 * 	solomon's final coordinates - [x, y] coordinates for solo's final location. 
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
export const solomonsQuest = (ar) => {
	let solomonsCoordinates = [0, 0];
	let prevTimeLayer = 0;
	for (const [timeLayerShift, direction, distance] of ar) {
		let standardDistance = getStandardDistance(
			distance,
			prevTimeLayer,
			timeLayerShift
		);
		solomonsCoordinates = getNewCoordinates(
			solomonsCoordinates,
			direction,
			standardDistance
		);
		prevTimeLayer += timeLayerShift;
	}

	function getStandardDistance(
		distance,
		prevTimeLayer,
		levelShift
	) {
		let layer = prevTimeLayer + levelShift;
		return distance * (2 ** layer);
	}
	function getNewCoordinates(
		oldCoordinates,
		mapDirection,
		standardDistance
	) {
		let newCoordinates = [...oldCoordinates];
		switch (mapDirection) {
			case 0:
				newCoordinates[1] += standardDistance; // North
				break;
			case 1:
				newCoordinates[0] += standardDistance; // East
				break;
			case 2:
				newCoordinates[1] -= standardDistance; // South
				break;
			case 3:
				newCoordinates[0] -= standardDistance; // West
				break;
			default:
				return newCoordinates;
		}
		return newCoordinates;
	}

	return solomonsCoordinates;
}