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
	// is this the fastest way?
	return array.filter((_, i) => i !== index);
};

export const getRandomElementOfArray = <T>(array: T[]): T => {
	return array[getRandomIndexOfArray(array)];
};
