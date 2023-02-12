import { create } from "zustand";
import { GameState, GameFlow } from "./types";

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
			participants: [],
			exampleSong: {
				// Kendrick Lamar - Money Trees
				spotifyURL: "https://open.spotify.com/track/2HbKqm4o0w5wEeEFXm2sD4",
				submitter: "Example Submitter",
				offset: [1, 21] // Starts on "It go Halle Berry or Hallelujah"
			},
			songs: []
		}
	},
	rounds: [],
	current: {
		round: -1,
		roundSection: 0,
		elimination: null
	}
}));

export const progressGameFlow = (): void => {
	useGame.setState(state => {
		const { flowState } = state;
		const nextFlowState = flowState + 1;
		return { flowState: nextFlowState };
	});
};

export default useGame;
