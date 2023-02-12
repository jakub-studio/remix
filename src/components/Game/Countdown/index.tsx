import {
	motion,
	AnimatePresence,
	useIsPresent,
	usePresence
} from "framer-motion";
import { RoundData } from "@/modules/state/types";
import { useEffect, useMemo, useState } from "react";
import useTimeout from "@/hooks/useTimeout";
import config from "@/config";
import useGame from "@/modules/state";
import { ParticipantElimination } from "./ParticipantElimination";
import PlaybackDisplay from "./PlaybackDisplay";

interface CountdownProps {}

export const Countdown: React.FC<CountdownProps> = ({}) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="flex gap-12 h-full w-full items-center justify-evenly"
		>
			<PlaybackDisplay />
			<ParticipantElimination />
		</motion.div>
	);
};

export type { CountdownProps };
