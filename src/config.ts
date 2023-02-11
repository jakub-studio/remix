interface Configuration {
	SPOTIFY_WEB_PLAYBACK_DEVICE_NAME: string;
	SPOTIFY_WEB_PLAYBACK_DEFAULT_VOLUME: number;
}

const config: Configuration = {
	SPOTIFY_WEB_PLAYBACK_DEVICE_NAME: "Remix Internal Player",
	SPOTIFY_WEB_PLAYBACK_DEFAULT_VOLUME: 0.75 // Must be between 0 and 1
};

export default config;
export type { Configuration };
