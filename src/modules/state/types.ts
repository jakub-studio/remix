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
	};
	game: {
		roundDurationInSeconds: number;
		participants: string[];
		exampleSong: SongData;
		songs: SongData[];
	};
}

interface GameState {
	cache: Record<string, unknown>;
	config: GameConfig;
	rounds: []; // GameRound[];
	current: {
		round: number;
		roundStage: number; // or enum
		elimination: unknown;
	};
}

export type { GameConfig, GameState };
