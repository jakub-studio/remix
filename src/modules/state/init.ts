import { shuffleArray } from "@/util";
import { extractDataFromSpotifyURL } from "@/modules/spotify/uri";

import useGame, { generateRoundData2 } from ".";
import { GameConfig, RoundSection, SongDataExpanded } from "./types";
import { requestTrackData, requestTracksData } from "../spotify/web-api";
import { Track } from "../spotify/types";
import globalConfig from "@/config";

const initGame = async (givenConfig: GameConfig): Promise<void> => {

	const songsWithDataExpanded: SongDataExpanded[] = givenConfig.game.songs.map(song => {
		const data = extractDataFromSpotifyURL(song.spotifyURL);

		return {
			...song,
			...data
		};
	});

	const exampleSongData = extractDataFromSpotifyURL(
		givenConfig.game.exampleSong.spotifyURL
	);
	const exampleTrackData = await requestTrackData(exampleSongData.id);

	const gameSongIds = songsWithDataExpanded.map(song => song.id);
	const allSongsTrackData = await requestTracksData(gameSongIds);

	const trackDataCache: Record<string, Track> = {
		[exampleTrackData.uri]: exampleTrackData
	};
	allSongsTrackData.forEach(track => {
		trackDataCache[track.uri] = track;
	});

	const roundsArray = songsWithDataExpanded.map((round, index) => generateRoundData2(round, index, trackDataCache));

	useGame.setState({
		config: givenConfig,
		rounds: globalConfig.SHUFFLE_SONGS ? shuffleArray(roundsArray) : roundsArray,
		current: {
			round: -1, // -1 indicates the example round
			roundSection: RoundSection.START,
			songData: Object.assign(exampleSongData, givenConfig.game.exampleSong),
			trackData: exampleTrackData
		},
		cache: trackDataCache
	});
};

export default initGame;
