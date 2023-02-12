import {
	motion,
	AnimatePresence,
	useIsPresent,
	usePresence
} from "framer-motion";
import { RoundData } from "@/modules/state/types";
import {
	PropsWithChildren,
	useCallback,
	useEffect,
	useMemo,
	useState
} from "react";
import useTimeout from "@/hooks/useTimeout";
import config from "@/config";
import useGame, { progressRoundSection } from "@/modules/state";
import useInterval from "@/hooks/useInterval";
import c from "clsx";
import { getRandomElementOfArray, removeElementOfArrayByIndex } from "@/util";

export const ParticipantElimination: React.FC = () => {
	const gameState = useGame();
	const participants = gameState.config.game.participants;

	// This is the list of participants that will be
	const [remainingParticipantsList, setRemainingParticipantsList] =
		useState(participants);

	const eliminationDelay: number = useMemo(() => {
		const delay =
			(gameState.config.game.roundDurationInSeconds * 1000) /
			participants.length;
		return delay;
	}, [gameState.config.game.roundDurationInSeconds, participants.length]);

	const eliminateParticipant = useCallback(() => {
		if (remainingParticipantsList.length === 2) {
			progressRoundSection();
			return;
		}

		const participantsClone = [...remainingParticipantsList];
		const participantsWithoutAnswer = removeElementOfArrayByIndex(
			participantsClone,
			participantsClone.indexOf(gameState.current.songData.submitter)
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
	}, [gameState, remainingParticipantsList]);

	useInterval(eliminateParticipant, eliminationDelay);

	return (
		<div className="h-full w-full">
			<div className="flex flex-col gap-6 h-full flex-wrap justify-evenly font-medium text-4xl">
				{participants.map(participant => (
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
		</div>
	);
};
