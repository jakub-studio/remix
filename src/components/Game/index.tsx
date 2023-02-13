import { useCallback, useEffect, useState } from "react";

import { useHotkeys } from "react-hotkeys-hook";
import ImageBackdrop from "../ImageBackdrop";

import { motion } from "framer-motion";

import useGame, {
	cacheNextRoundSpotifyTrack,
	progressGameFlow,
	progressRoundSection
} from "@/modules/state";
import { RoundIndicator } from "./RoundIndicator";
import { RoundSection } from "@/modules/state/types";
import { Countdown } from "./Countdown";
import { playTrack } from "@/modules/spotify/web-api";
import config from "@/config";
import { setVolume } from "@/modules/spotify/state";
import { convertTimeArrayToMs } from "@/modules/time";

// drop-shadow(0px 2px 6px rgba(0,0,0,0.15))

const Game = () => {
	const { current: currentRound } = useGame();
	const { roundSection } = currentRound;

	const bgImage = currentRound.trackData.album.images[
		currentRound.trackData.album.images.length - 1
	].url;

/* 	const onRoundIndicatorComplete = useCallback(() => {
		progressRoundSection();
	}, [currentRound.songData.uri]); */

	useEffect(() => {
		playTrack(currentRound.songData.uri, currentRound.songData.offset ? convertTimeArrayToMs(currentRound.songData.offset) : void 0);
		setVolume(config.SPOTIFY_WEB_PLAYBACK_VOLUME);
		cacheNextRoundSpotifyTrack(currentRound.round);
	}, [currentRound.songData.uri, currentRound.songData.offset, currentRound.round]);

	return (
		<ImageBackdrop imageSrc={bgImage}>
			<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-10 drop-shadow-md">
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
