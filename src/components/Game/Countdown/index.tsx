import {
	motion,
	AnimatePresence,
} from "framer-motion";
import {  RoundSection } from "@/modules/state/types";
import { useState } from "react";
import { progressToNextRound } from "@/modules/state";
import { ParticipantElimination } from "./ParticipantElimination";
import PlaybackDisplay from "./PlaybackDisplay";
import { useHotkeys } from "react-hotkeys-hook";
import { pause } from "@/modules/spotify/state";
import { useCurrentRound } from "@/hooks/useCurrentRound";

export const Countdown: React.FC = () => {
	const [showPlayback, setShowPlayback] = useState(true);
	const { section: roundSection } = useCurrentRound();

	useHotkeys("ArrowRight", () => {
		if (roundSection !== RoundSection.ANSWER) return;

		pause();
		setShowPlayback(false);

		setTimeout(() => {
			progressToNextRound();
		}, 1000);
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
