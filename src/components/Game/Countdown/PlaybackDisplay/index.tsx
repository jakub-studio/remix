import useGame from "@/modules/state";
import { RoundSection } from "@/modules/state/types";
import { useEffect, useState } from "react";
import AlbumArt from "./AlbumArt";




const PlaybackDisplay = () => {
	const gameState = useGame();
	const [flip, setFlip] = useState(false);

	useEffect(() => {
		gameState.current.roundSection === RoundSection.ANSWER && setTimeout(() => setFlip(true), 2250);
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
				<h1 className="font-bold text-5xl mb-8">
					{gameState.current.trackData.name}
				</h1>
				<div>
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
				<div className="mt-2 text-lg uppercase tracking-wider font-medium">
					<span>
						{gameState.current.trackData.album.name},{" "}
						{gameState.current.trackData.album.release_date}
					</span>
				</div>
			</div>
		</div>
	);
};

export default PlaybackDisplay;

export {};
