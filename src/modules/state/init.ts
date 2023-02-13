import { shuffleArray } from "@/util";
import { extractDataFromSpotifyURL } from "@/modules/spotify/uri";

import useGame from ".";
import { GameConfig, RoundSection, SongDataExpanded } from "./types";
import { requestTrackData, requestTracksData } from "../spotify/web-api";
import { Track } from "../spotify/types";
import globalConfig from "@/config";

const initGame = async (givenConfig: GameConfig): Promise<void> => {

	const roundsWithURI: SongDataExpanded[] = givenConfig.game.songs.map(song => {
		const data = extractDataFromSpotifyURL(song.spotifyURL);

		return {
			...song,
			...data
		};
	});

	const exampleSongData = extractDataFromSpotifyURL(
		givenConfig.game.exampleSong.spotifyURL
	);
	const trackData = await requestTrackData(exampleSongData.id);

	const gameSongIds = roundsWithURI.map(song => song.id);
	const dataAll = await requestTracksData(gameSongIds);

	console.log(gameSongIds);
	console.log(dataAll);

	const cache: Record<string, Track> = {};
	dataAll.forEach(track => {
		cache[track.uri] = track;
	});

	cache[exampleSongData.uri] = trackData;

	useGame.setState({
		config: givenConfig,
		rounds: globalConfig.SHUFFLE_SONGS ? shuffleArray(roundsWithURI) : roundsWithURI,
		current: {
			round: -1, // -1 indicates the example round
			roundSection: RoundSection.START,
			songData: Object.assign(exampleSongData, givenConfig.game.exampleSong),
			trackData
		},
		cache
	});
};

export default initGame;
