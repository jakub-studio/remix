import { useState } from "react";

import { motion } from "framer-motion";

import useGame, { progressGameFlow } from "@/modules/state";
import background from "@/assets/background.jpeg";
import { useHotkeys } from "react-hotkeys-hook";
import ImageBackdrop from "../ImageBackdrop";


const Leaderboard: React.FC = () => {
	return (
		<ImageBackdrop imageSrc={background}>
			<div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
				<h1 className="text-5xl mb-8">Aaaand the winner is.....</h1>
			</div>
		</ImageBackdrop>
	);
};

export default Leaderboard;
