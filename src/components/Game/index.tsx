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
import { getLastElementOfArray } from "@/util";

// drop-shadow(0px 2px 6px rgba(0,0,0,0.15))

const Game = () => {
	const { index, section, roundData: currentRound } = useCurrentRound();

	// The last image in the array is the smallest, so we use that to save on bandwidth.
	const backgroundImage = getLastElementOfArray(currentRound.trackData.album.images)

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
		<ImageBackdrop imageSrc={backgroundImage.url}>
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
