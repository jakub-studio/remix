import { useState } from "react";

import { useHotkeys } from "react-hotkeys-hook";
import ImageBackdrop from "../ImageBackdrop";

import { motion } from "framer-motion";

import useGame, { progressGameFlow } from "@/modules/state";
import background from "@/assets/background.jpeg";

const Game = () => {
	const {} = useGame();

	useHotkeys("ArrowRight", () => {
		// progress game
	});

	return (
		<ImageBackdrop imageSrc={background}>
			<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-20"></div>
		</ImageBackdrop>
	);
};

export default Game;
