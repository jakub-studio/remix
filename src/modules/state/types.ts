import type { TimeArray } from "@/modules/time";
import type { Track } from "@/modules/spotify/types";

interface SongData {
	spotifyURL: string;
	submitter: string;
	offset: TimeArray;
}

interface SongDataExpanded extends SongData {
	uri: string;
	id: string;
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

interface RoundData {
	round: number;
	roundSection: RoundSection;
	songData: SongDataExpanded;
	trackData: Track;
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

enum RoundSection {
	START,
	PLAY,
	ANSWER
}

interface GameState {
	flowState: GameFlow;
	cache: Record<string, unknown>;
	config: GameConfig;
	rounds: SongDataExpanded[];
	current: RoundData;
	nextRoundCache: RoundData;
}

// enums must be exported regularly as they get transpiled to
// regular objects.
export { GameFlow, RoundSection };

export type { GameConfig, GameState, SongData, SongDataExpanded, RoundData };
