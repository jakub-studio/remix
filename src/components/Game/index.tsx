import { useEffect } from "react";

import ImageBackdrop from "../ImageBackdrop";

import { progressRoundSection } from "@/modules/state";
import { RoundIndicator } from "./RoundIndicator";
import { RoundSection } from "@/modules/state/types";
import { Countdown } from "./Countdown";
import { playTrack } from "@/modules/spotify/web-api";
import config from "@/config";
import { setVolume } from "@/modules/spotify/state";
import { convertTimeArrayToMs } from "@/modules/time";
import { useCurrentRound } from "@/hooks/useCurrentRound";

// drop-shadow(0px 2px 6px rgba(0,0,0,0.15))

const Game = () => {
	const { index, section, roundData: currentRound } = useCurrentRound();

	const bgImage =
		currentRound.trackData.album.images[
			currentRound.trackData.album.images.length - 1
		].url;

	/* 	const onRoundIndicatorComplete = useCallback(() => {
		progressRoundSection();
	}, [currentRound.songData.uri]); */

	useEffect(() => {
		playTrack(
			currentRound.songData.uri,
			currentRound.songData.offset
				? convertTimeArrayToMs(currentRound.songData.offset)
				: void 0
		);
		setVolume(config.SPOTIFY_WEB_PLAYBACK_VOLUME);
	}, [currentRound.songData.uri, currentRound.songData.offset, index]);

	return (
		<ImageBackdrop imageSrc={bgImage}>
			<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-10 drop-shadow-md">
				{section === RoundSection.START ? (
					<RoundIndicator onComplete={progressRoundSection} />
				) : (
					<Countdown />
				)}
			</div>
		</ImageBackdrop>
	);
};

export default Game;
