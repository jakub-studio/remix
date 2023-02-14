import useGame from "@/modules/state";

export const useCurrentRound = () => {
	const { currentRound, rounds, exampleRound } = useGame();
	const { index, section } = currentRound;
	const roundData = index === -1 ? exampleRound : rounds[index];

	return {
		index,
		section,
		roundData
	};
};
