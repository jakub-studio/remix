import config from "@/config";
import { useCurrentRound } from "@/hooks/useCurrentRound";
import { setVolume } from "@/modules/spotify/state";
import { RoundSection } from "@/modules/state/types";
import { useEffect, useMemo, useState } from "react";
import AlbumArt from "./AlbumArt";

const PlaybackDisplay = () => {
	const [flip, setFlip] = useState(false);
	const { roundData, section } = useCurrentRound();

	useEffect(() => {
		if (section !== RoundSection.ANSWER) return;

		setTimeout(() => {
			setFlip(true);
			setVolume(config.SPOTIFY_WEB_PLAYBACK_VOLUME_DECREASED);
		}, 2250);
	}, [section]);

	const releaseDate = useMemo(() => {
		return roundData.trackData.album.release_date.split("-")[0];
	}, [roundData.trackData.album.release_date]);

	return (
		<div className="w-full flex flex-col items-center min-w-[650px]">
			<AlbumArt
				flip={flip}
				albumArtUrl={roundData.trackData.album.images[0].url}
			>
				{roundData.songData.submitter}
			</AlbumArt>
			<div className="w-full flex flex-col items-center mt-8">
				<h1 className="font-bold text-5xl mb-8 text-center">
					{roundData.trackData.name}
				</h1>
				<div className="text-center">
					{roundData.trackData.artists.map((artist, index) => {
						return (
							<span key={index} className="font-medium text-3xl mb-4">{`${
								artist.name
							}${
								index < roundData.trackData.artists.length - 1 ? ", " : ""
							}`}</span>
						);
					})}
				</div>
				<div className="mt-2 text-lg uppercase tracking-wider font-medium text-center">
					<span>
						{roundData.trackData.album.name}, {releaseDate}
					</span>
				</div>
			</div>
		</div>
	);
};

export default PlaybackDisplay;

export {};
