import { useState } from "react";

import { useHotkeys } from "react-hotkeys-hook";
import ImageBackdrop from "../ImageBackdrop";

import { motion } from "framer-motion";

import useGame, {
	progressGameFlow,
	progressRoundSection
} from "@/modules/state";
import background from "@/assets/background.jpeg";
import { RoundIndicator } from "./RoundIndicator";
import { RoundSection } from "@/modules/state/types";
import { Countdown } from "./Countdown";

// drop-shadow(0px 2px 6px rgba(0,0,0,0.15))

const Game = () => {
	const { current: currentRound } = useGame();
	const { roundSection } = currentRound;

	useHotkeys("ArrowRight", () => {
		if (roundSection === RoundSection.ANSWER) {
			// start next round
		}
	});

	return (
		<ImageBackdrop imageSrc={background}>
			<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-20 drop-shadow-md">
				{/* Start / Round Indicator */}
				{roundSection === RoundSection.START && (
					<RoundIndicator
						round={currentRound}
						onComplete={progressRoundSection}
					/>
				)}

				{/* Countdown */}
				{roundSection === RoundSection.PLAY && <Countdown />}
			</div>
		</ImageBackdrop>
	);
};

export default Game;
