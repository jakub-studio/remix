import { create } from "zustand";
import { GameState, GameConfig } from "./types";

const useGame = create<GameState>()(set => ({
	cache: {},
	config: {
		strings: {
			gameTitle: "Game Title",
			gameSubTitle: "Game Sub Title"
		},
		game: {
			roundDurationInSeconds: 20,
			participants: [],
			exampleSong: {},
			songs: []
		}
	},
	rounds: [],
	current: {
		round: 0,
		roundStage: 0,
		elimination: null
	}
}));

export default useGame;
