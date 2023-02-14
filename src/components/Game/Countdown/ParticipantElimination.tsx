import {
	useCallback,
	useMemo,
	useState
} from "react";
import useGame, { progressRoundSection } from "@/modules/state";
import useInterval from "@/hooks/useInterval";
import c from "clsx";
import {
	getRandomElementOfArray,
	removeElementOfArrayByIndex,
	splitArrayIntoChunks
} from "@/util";
import { useCurrentRound } from "@/hooks/useCurrentRound";

export const ParticipantElimination: React.FC = () => {
	const { roundData } = useCurrentRound();
	const gameConfig = useGame(s => s.config.game);
	const participants = gameConfig.participants;

	// This is the list of participants that will be
	const [remainingParticipantsList, setRemainingParticipantsList] =
		useState(participants);

	const eliminationDelay: number = useMemo(() => {
		const delay =
			(gameConfig.roundDurationInSeconds * 1000) /
			participants.length;
		return delay;
	}, [gameConfig.roundDurationInSeconds, participants.length]);

	const eliminateParticipant = useCallback(() => {
		if (remainingParticipantsList.length === 2) {
			progressRoundSection();
			return;
		}

		const participantsClone = [...remainingParticipantsList];
		const participantsWithoutAnswer = removeElementOfArrayByIndex(
			participantsClone,
			participantsClone.indexOf(roundData.songData.submitter)
		);

		const eliminatedParticipant = getRandomElementOfArray(
			participantsWithoutAnswer
		);

		setRemainingParticipantsList(
			removeElementOfArrayByIndex(
				participantsClone,
				participantsClone.indexOf(eliminatedParticipant)
			)
		);
	}, [roundData.songData.submitter, remainingParticipantsList]);

	useInterval(eliminateParticipant, eliminationDelay);

	const columns = splitArrayIntoChunks(participants, 8);

	return (
		<div className="h-full w-full flex gap-16 xl:gap-24">
			{columns.map((column, i) => (
				<div
					key={i}
					className="flex flex-col gap-6 h-full flex-wrap justify-evenly font-medium text-2xl xl:text-4xl"
				>
					{column.map(participant => (
						<div
							key={participant}
							className={c("transition-opacity duration-200", {
								"opacity-20":
									remainingParticipantsList.indexOf(participant) === -1
							})}
						>
							{participant}
						</div>
					))}
				</div>
			))}
		</div>
	);
};
