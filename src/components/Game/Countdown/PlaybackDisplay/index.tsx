import config from "@/config";
import { setVolume } from "@/modules/spotify/state";
import useGame from "@/modules/state";
import { RoundSection } from "@/modules/state/types";
import { useEffect, useMemo, useState } from "react";
import AlbumArt from "./AlbumArt";

const PlaybackDisplay = () => {
	const gameState = useGame();
	const [flip, setFlip] = useState(false);

	useEffect(() => {
		if (gameState.current.roundSection !== RoundSection.ANSWER) return;

		setTimeout(() => {
			setFlip(true)
			setVolume(config.SPOTIFY_WEB_PLAYBACK_VOLUME_DECREASED);
		}, 2250);
	}, [gameState]);

	const releaseDate = useMemo(() => {
		return gameState.current.trackData.album.release_date.split("-")[0];
	}, [gameState])

	return (
		<div className="w-full flex flex-col items-center">
			<AlbumArt
				flip={flip}
				albumArtUrl={gameState.current.trackData.album.images[0].url}
			>
				{gameState.current.songData.submitter}
			</AlbumArt>
			<div className="w-full flex flex-col items-center mt-8">
				<h1 className="font-bold text-5xl mb-8 text-center">
					{gameState.current.trackData.name}
				</h1>
				<div className="text-center">
					{gameState.current.trackData.artists.map((artist, index) => {
						return (
							<span key={index} className="font-medium text-3xl mb-4">{`${
								artist.name
							}${
								index < gameState.current.trackData.artists.length - 1
									? ", "
									: ""
							}`}</span>
						);
					})}
				</div>
				<div className="mt-2 text-lg uppercase tracking-wider font-medium text-center">
					<span>
						{gameState.current.trackData.album.name},{" "}
						{releaseDate}
					</span>
				</div>
			</div>
		</div>
	);
};

export default PlaybackDisplay;

export {};
