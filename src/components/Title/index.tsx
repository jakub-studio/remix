import { useState } from "react";

import { motion } from "framer-motion";

import useGame, { progressGameFlow } from "@/modules/state";
import background from "@/assets/background.jpeg";
import { useHotkeys } from "react-hotkeys-hook";
import ImageBackdrop from "../ImageBackdrop";

const Title: React.FC = () => {
	const [showRules, setShowRules] = useState<boolean>(false);
	const {
		gameTitle: title,
		gameSubTitle: subTitle,
		rules
	} = useGame(s => s.config.strings);

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
		<ImageBackdrop imageSrc={background}>

			{ /* Title */ }
			<div className="absolute top-0 left-0 w-full h-full flex items-center justify-start pl-20">
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
			</div>

			{ /* Rules */}
			<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pl-20">
				<motion.div
					initial={false}
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
						{rules.map((rule, i) => (
							<li key={i}>{rule}</li>
						))}
					</ol>
				</motion.div>
			</div>
		</ImageBackdrop>
	);
};

export default Title;
