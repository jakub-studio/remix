import { shuffleArray } from "@/util";
import { extractDataFromSpotifyURL } from "@/modules/spotify/uri";

import useGame from ".";
import { GameConfig, RoundSection, SongDataExpanded } from "./types";
import { requestTrackData } from "../spotify/web-api";

const initGame = async (config: GameConfig): Promise<void> => {
	const songsShuffled = shuffleArray(config.game.songs);
	const roundsWithURI: SongDataExpanded[] = songsShuffled.map(song => {
		const data = extractDataFromSpotifyURL(song.spotifyURL);

		return {
			...song,
			...data
		};
	});

	const exampleSongData = extractDataFromSpotifyURL(
		config.game.exampleSong.spotifyURL
	);
	const trackData = await requestTrackData(exampleSongData.id);

	useGame.setState({
		config,
		rounds: roundsWithURI,
		current: {
			round: -1, // -1 indicates the example round
			roundSection: RoundSection.START,
			songData: Object.assign(exampleSongData, config.game.exampleSong),
			trackData
		},
		cache: {
			[exampleSongData.uri]: trackData
		}
	});
};

export default initGame;
