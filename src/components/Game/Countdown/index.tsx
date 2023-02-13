import {
	motion,
	AnimatePresence,
	useIsPresent,
	usePresence
} from "framer-motion";
import { RoundData, RoundSection } from "@/modules/state/types";
import { useEffect, useMemo, useState } from "react";
import useTimeout from "@/hooks/useTimeout";
import config from "@/config";
import useGame from "@/modules/state";
import { ParticipantElimination } from "./ParticipantElimination";
import PlaybackDisplay from "./PlaybackDisplay";
import { useHotkeys } from "react-hotkeys-hook";
import { pause } from "@/modules/spotify/state";

interface CountdownProps {}

export const Countdown: React.FC<CountdownProps> = ({}) => {
	const [showPlayback, setShowPlayback] = useState(true);
	const roundSection = useGame(s => s.current.roundSection);

	useHotkeys("ArrowRight", () => {
		if (roundSection !== RoundSection.ANSWER) return;
		
		pause();
		setShowPlayback(false);
	});

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="flex gap-12 h-full w-full items-center justify-evenly"
		>
			<AnimatePresence>
				{showPlayback && (
					<motion.div
					layout
					key="playback"
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="mx-24"
				>
					<PlaybackDisplay />
				</motion.div>
				)}
				{roundSection === RoundSection.PLAY && (
					<motion.div
						layout
						key="participants"
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="h-full w-full"
					>
						<ParticipantElimination />
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
};

export type { CountdownProps };
