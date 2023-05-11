import { motion, AnimatePresence, useIsPresent } from "framer-motion";
import { useEffect, useState } from "react";
import useTimeout from "@/hooks/useTimeout";
import config from "@/config";
import useGame from "@/modules/state";
import { useCurrentRound } from "@/hooks/useCurrentRound";

interface RoundIndicatorProps {
	onComplete: () => void;
}

export const RoundIndicator: React.FC<RoundIndicatorProps> = ({
	onComplete
}) => {
	const { index } = useCurrentRound();
	const [showText, setShowText] = useState(true);

	useTimeout(() => {
		setShowText(false);
	}, config.ROUND_INDICATOR_DISPLAY_TIME_IN_SECONDS * 1000);

	const isExampleRound = index === -1;

	const roundString = isExampleRound ? "Example Round" : "Round " + (index + 1);

	const roundSubText = isExampleRound
		? "No points will be awarded"
		: `of ${useGame.getState().rounds.length}`;

	return (
		<AnimatePresence>
			{showText && (
				<RoundIndicatorInner
					roundString={roundString}
					roundSubText={roundSubText}
					onComplete={onComplete}
				/>
			)}
		</AnimatePresence>
	);
};

interface InnerProps extends RoundIndicatorProps {
	roundString: string;
	roundSubText: string;
}

export const RoundIndicatorInner: React.FC<InnerProps> = ({
	roundString,
	roundSubText,
	onComplete
}) => {
	const isPresent = useIsPresent();

	// This will execute onComplete 500ms after the component is unmounted.
	useEffect(() => {
		!isPresent && setTimeout(onComplete, 500);
	}, [isPresent, onComplete]);

	return (
		<motion.div
			className="flex flex-col items-center justify-center p-20"
			initial={{ opacity: 0, y: 100 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -100 }}
			transition={{ duration: 0.4, bounce: 0, type: "spring" }}
		>
			<div className="text-8xl">{roundString}</div>
			<div className="text-3xl mt-6 font-medium">{roundSubText}</div>
		</motion.div>
	);
};

export type { RoundIndicatorProps };
