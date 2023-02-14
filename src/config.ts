interface Configuration {
	SPOTIFY_WEB_PLAYBACK_DEVICE_NAME: string;
	SPOTIFY_WEB_PLAYBACK_VOLUME: number;
	SPOTIFY_WEB_PLAYBACK_VOLUME_DECREASED: number;

	ROUND_INDICATOR_DISPLAY_TIME_IN_SECONDS: number;
	SHUFFLE_SONGS: boolean;
}

const config: Configuration = {
	SPOTIFY_WEB_PLAYBACK_DEVICE_NAME: "Remix Internal Player",
	SPOTIFY_WEB_PLAYBACK_VOLUME: 0.75, // Must be between 0 and 1
	SPOTIFY_WEB_PLAYBACK_VOLUME_DECREASED: 0.1, // Plays between rounds
	ROUND_INDICATOR_DISPLAY_TIME_IN_SECONDS: 2,

	SHUFFLE_SONGS: true
};

export default config;
export type { Configuration };
