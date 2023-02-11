import { useState } from "react";

import { motion } from "framer-motion";

import useGame, { progressGameFlow } from "@/modules/state";
import background from "@/assets/background.jpeg";
import { useHotkeys } from "react-hotkeys-hook";

const Title: React.FC = () => {
	const [showRules, setShowRules] = useState<boolean>(false);
	const { gameTitle: title, gameSubTitle: subTitle } = useGame(
		s => s.config.strings
	);

	useHotkeys("ArrowRight", () => {
		// toggle rules
		if (!showRules) setShowRules(true);
		else progressGameFlow();
	});

	useHotkeys("ArrowLeft", () => {
		// toggle rules
		if (showRules) setShowRules(false);
	});

	return (
		<div className="text-white bg-black font-bold relative w-full h-screen">
			<img src={background} className="blur-3xl w-full h-full object-cover" />
			<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pl-20">
				<motion.div
					style={{ opacity: 0 }}
					animate={{
						x: showRules ? -500 : 0,
						opacity: showRules ? [1, 0, 0] : 1
					}}
					transition={{
						opacity: { duration: 0.2 },
						x: { type: "spring", bounce: 0, duration: 0.4 }
					}}
				>
					<h1 className="text-9xl mb-4">{title}</h1>
					<h2 className="text-4xl">{subTitle}</h2>
				</motion.div>
				<motion.div
					style={{ opacity: 0 }}
					animate={{
						x: showRules ? 0 : 500,
						opacity: !showRules ? [1, 0, 0] : 1
					}}
					transition={{
						opacity: { duration: 0.2 },
						x: { type: "spring", bounce: 0, duration: 0.4 }
					}}
				>
					<h1 className="text-3xl mb-4">Game Rules</h1>
					<ol className="text-xl list-disc">
						<li>Press the arrow keys to move</li>
						<li>Press the space bar to jump</li>
						<li>Press the shift key to sprint</li>
					</ol>
				</motion.div>
			</div>
		</div>
	);
};

export default Title;
