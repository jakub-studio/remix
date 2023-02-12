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

	const bgImage = currentRound.trackData.album.images[
		currentRound.trackData.album.images.length - 1
	].url;

	return (
		<ImageBackdrop imageSrc={bgImage}>
			<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-20 drop-shadow-md">
				{roundSection === RoundSection.START ? (
					<RoundIndicator
						round={currentRound}
						onComplete={progressRoundSection}
					/>
				) : (
					<Countdown />
				)}
			</div>
		</ImageBackdrop>
	);
};

export default Game;
