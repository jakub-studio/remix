import {
	motion,
	AnimatePresence,
	useIsPresent,
	usePresence
} from "framer-motion";
import { RoundData } from "@/modules/state/types";
import { useEffect, useState } from "react";
import useTimeout from "@/hooks/useTimeout";
import config from "@/config";
import useGame from "@/modules/state";

interface RoundIndicatorProps {
	round: RoundData;
	onComplete: () => void;
}

export const RoundIndicator: React.FC<RoundIndicatorProps> = ({
	round,
	onComplete
}) => {
	const [showText, setShowText] = useState(true);

	useTimeout(() => {
		setShowText(false);
	}, config.ROUND_INDICATOR_DISPLAY_TIME_IN_SECONDS * 1000);
	

	return (
		<AnimatePresence>
			{showText && (
				<RoundIndicatorInner round={round} onComplete={onComplete} />
			)}
		</AnimatePresence>
	);
};

export const RoundIndicatorInner: React.FC<RoundIndicatorProps> = ({
	round,
	onComplete
}) => {
	const isPresent = useIsPresent();

	useEffect(() => {
		!isPresent && setTimeout(onComplete, 500);
	}, [isPresent, onComplete]);

	/* 	useEffect(() => {
		if (isPresent) return;
		// The following code will run when the component is removed

		onComplete(); // onComplete will progress the round and start the actual game/playing part
		setTimeout(safeToRemove, 500);
	}, [isPresent, onComplete, safeToRemove]); */

	const roundIndex = round.round; // This value can probably be renamed
	const roundString =
		roundIndex === -1
			? "Example Round"
			: (roundIndex + 1).toString().padStart(2, "0");

	const roundSubText =
		roundIndex === -1 ? "No points will be awarded" : `of ${useGame.getState().rounds.length}`;

	return (
		<motion.div
			className="flex flex-col items-center justify-center p-20"
			initial={{ opacity: 0, y: 100 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -100 }}
			transition={{ duration: 0.4, bounce: 0, type: "spring" }}
		>
			<div className="text-8xl">Round {roundString}</div>
			<div className="text-3xl mt-6 font-medium">{roundSubText}</div>
		</motion.div>
	);
};

export type { RoundIndicatorProps };
