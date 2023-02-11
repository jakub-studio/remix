import type { TimeArray } from "@/modules/time";

interface SongData {
	spotifyURL: string;
	submitter: string;
	offset: TimeArray;
}

interface GameConfig {
	strings: {
		gameTitle: string;
		gameSubTitle: string;
		rules: string[];
	};
	game: {
		roundDurationInSeconds: number;
		participants: string[];
		exampleSong: SongData;
		songs: SongData[];
	};
}

// Changing the order of the enum values will change
// the order in which the game flow progresses.
// Think of it as an array as well as an enum.
enum GameFlow {
	CONFIG,
	INTRO,
	GAME,
	LEADER_BOARD,
	END
}

interface GameState {
	flowState: GameFlow;
	cache: Record<string, unknown>;
	config: GameConfig;
	rounds: []; // GameRound[];
	current: {
		round: number;
		roundStage: number; // or enum
		elimination: unknown;
	};
}

export { GameFlow };

export type { GameConfig, GameState };
