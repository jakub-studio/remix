import { useState } from "react";

import { motion } from "framer-motion";

import useGame, { progressGameFlow } from "@/modules/state";
import background from "@/assets/background.jpeg";
import { useHotkeys } from "react-hotkeys-hook";
import ImageBackdrop from "../ImageBackdrop";

const embedCode = `<iframe src="https://giphy.com/embed/hfSbVIofUTAIs09uVk" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/HBOMax-the-point-breaks-over-hbomax-hfSbVIofUTAIs09uVk">via GIPHY</a></p>`

const EndScreen: React.FC = () => {
	return (
		<ImageBackdrop imageSrc={background}>
			<div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
				<h1 className="text-5xl mb-8">Thank you for playing!</h1>
				<div dangerouslySetInnerHTML={{__html: embedCode}}></div>
			</div>
		</ImageBackdrop>
	);
};

export default EndScreen;
