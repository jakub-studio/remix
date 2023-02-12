import { create } from "zustand";
import { GameState, GameFlow, RoundData, RoundSection } from "./types";
import createLog from "debug";

const logState = createLog("game-state");

const useGame = create<GameState>()(set => ({
	flowState: GameFlow.INTRO,
	cache: {},
	config: {
		strings: {
			gameTitle: "Game Title",
			gameSubTitle: "Game Sub Title",
			rules: ["Rule 1", "Rule 2", "Rule 3"]
		},
		game: {
			roundDurationInSeconds: 20,
			participants: Array.from(
				{ length: 20 },
				(_, i) => `Example Submitter ${i + 1}`
			),
			exampleSong: {
				// Kendrick Lamar - Money Trees
				spotifyURL: "https://open.spotify.com/track/2HbKqm4o0w5wEeEFXm2sD4",
				submitter: "Example Submitter 1",
				offset: [1, 21] // Starts on "It go Halle Berry or Hallelujah"
			},
			songs: []
		}
	},
	rounds: [],
	current: {
		round: -1,
		roundSection: 0,
		songData: {
			uri: "spotify:track:2HbKqm4o0w5wEeEFXm2sD4",
			id: "2HbKqm4o0w5wEeEFXm2sD4",
			spotifyURL: "https://open.spotify.com/track/2HbKqm4o0w5wEeEFXm2sD4",
			submitter: "Example Submitter 1",
			offset: [1, 21]
		},

		trackData: {
			album: {
				album_type: "album",
				artists: [
					{
						external_urls: {
							spotify: "https://open.spotify.com/artist/2YZyLoL8N0Wb9xBt1NhZWg"
						},
						href: "https://api.spotify.com/v1/artists/2YZyLoL8N0Wb9xBt1NhZWg",
						id: "2YZyLoL8N0Wb9xBt1NhZWg",
						name: "Kendrick Lamar",
						type: "artist",
						uri: "spotify:artist:2YZyLoL8N0Wb9xBt1NhZWg"
					}
				],
				available_markets: ["CA", "MX", "US"],
				external_urls: {
					spotify: "https://open.spotify.com/album/6PBZN8cbwkqm1ERj2BGXJ1"
				},
				href: "https://api.spotify.com/v1/albums/6PBZN8cbwkqm1ERj2BGXJ1",
				id: "6PBZN8cbwkqm1ERj2BGXJ1",
				images: [
					{
						height: 640,
						url: "https://i.scdn.co/image/ab67616d0000b273d28d2ebdedb220e479743797",
						width: 640
					},
					{
						height: 300,
						url: "https://i.scdn.co/image/ab67616d00001e02d28d2ebdedb220e479743797",
						width: 300
					},
					{
						height: 64,
						url: "https://i.scdn.co/image/ab67616d00004851d28d2ebdedb220e479743797",
						width: 64
					}
				],
				name: "good kid, m.A.A.d city",
				release_date: "2012",
				release_date_precision: "year",
				total_tracks: 13,
				type: "album",
				uri: "spotify:album:6PBZN8cbwkqm1ERj2BGXJ1"
			},
			artists: [
				{
					external_urls: {
						spotify: "https://open.spotify.com/artist/2YZyLoL8N0Wb9xBt1NhZWg"
					},
					href: "https://api.spotify.com/v1/artists/2YZyLoL8N0Wb9xBt1NhZWg",
					id: "2YZyLoL8N0Wb9xBt1NhZWg",
					name: "Kendrick Lamar",
					type: "artist",
					uri: "spotify:artist:2YZyLoL8N0Wb9xBt1NhZWg"
				},
				{
					external_urls: {
						spotify: "https://open.spotify.com/artist/28ExwzUQsvgJooOI0X1mr3"
					},
					href: "https://api.spotify.com/v1/artists/28ExwzUQsvgJooOI0X1mr3",
					id: "28ExwzUQsvgJooOI0X1mr3",
					name: "Jay Rock",
					type: "artist",
					uri: "spotify:artist:28ExwzUQsvgJooOI0X1mr3"
				}
			],
			available_markets: ["CA", "MX", "US"],
			disc_number: 1,
			duration_ms: 386906,
			explicit: true,
			external_ids: { isrc: "USUM71210785" },
			external_urls: {
				spotify: "https://open.spotify.com/track/2HbKqm4o0w5wEeEFXm2sD4"
			},
			href: "https://api.spotify.com/v1/tracks/2HbKqm4o0w5wEeEFXm2sD4",
			id: "2HbKqm4o0w5wEeEFXm2sD4",
			is_local: false,
			name: "Money Trees",
			popularity: 77,
			preview_url:
				"https://p.scdn.co/mp3-preview/f77a38bc41d3298cd083897d56bfaf56bf014535?cid=774b29d4f13844c495f206cafdad9c86",
			track_number: 5,
			type: "track",
			uri: "spotify:track:2HbKqm4o0w5wEeEFXm2sD4"
		}
	},
	// @ts-ignore
	nextRoundCache: {}
}));

Object.defineProperty(window, "gameState", {
	value: useGame
});

useGame.subscribe(state => {
	logState("Game state updated %o", state);
});

export const progressGameFlow = (): void => {
	useGame.setState(state => {
		const { flowState } = state;
		const nextFlowState = flowState + 1;
		return { flowState: nextFlowState };
	});
};

export const progressRoundSection = (): void => {
	useGame.setState(state => {
		const { current } = state;
		const nextRoundSection = current.roundSection + 1;
		return { current: { ...current, roundSection: nextRoundSection } };
	});
};

export const generateRoundData = async (): RoundData => {
	return {
		round: 10,
		roundSection: RoundSection.START,
		songData: null,
		trackData: null,
	}
};



export const prepareNextRoundData = (): void => {
	useGame.setState(state => {
		const { nextRoundCache } = state;
		const nextRoundCacheIsAvailable = Object.hasOwn(nextRoundCache, "trackData");

		const newRound = nextRoundCacheIsAvailable ? nextRoundCache : generateRoundData();
		return {
			current: newRound,
		};
	});
};

export default useGame;
