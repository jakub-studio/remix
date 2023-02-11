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

export type { GameConfig };
