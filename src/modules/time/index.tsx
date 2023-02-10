export const SECOND_IN_MS = 1000;
export const MINUTE_IN_MS = 60 * SECOND_IN_MS;

/**
 * [minutes, seconds]
 */
type TimeArray = [number, number];

export const convertTimeArrayToMs = (timeArray: TimeArray) => {
	const [/* hours, */ minutes, seconds] = timeArray;

	return (
		/* hours * 60 * MINUTE_IN_MS + */
		minutes * MINUTE_IN_MS + seconds * SECOND_IN_MS
	);
};

export type { TimeArray };
