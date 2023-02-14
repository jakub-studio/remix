export const shuffleArray = <T>(array: T[]): T[] => {
	const newArray = [...array];
	for (let i = newArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
	}
	return newArray;
};

export const getRandomIndexOfArray = <T>(array: T[]): number => {
	return Math.floor(Math.random() * array.length);
};

export const removeElementOfArrayByIndex = <T>(
	array: T[],
	index: number
): T[] => {
	const newArray = [...array];
	newArray.splice(index, 1);
	return newArray;
};

export const getRandomElementOfArray = <T>(array: T[]): T => {
	return array[getRandomIndexOfArray(array)];
};

export const splitArrayIntoChunks = <T>(
	array: T[],
	chunkSize: number
): T[][] => {
	const chunks: T[][] = [];
	for (let i = 0; i < array.length; i += chunkSize) {
		chunks.push(array.slice(i, i + chunkSize));
	}
	return chunks;
};
