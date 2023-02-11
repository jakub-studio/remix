import config from "@/config";

import useSpotify from "./state";
import { SpotifyPlayer, SpotifyPlayerConstructorOptions } from "./types";
import { bindEventsToSpotifyPlayer } from "./events";
import { logSpotifyPlayer } from "./log";
import { getSpotifyToken } from "./token";

const prepareSpotifyWebPlaybackSDKReadyCallback = (): void => {
	// Create a global callback called onSpotifyWebPlaybackSDKReady
	// This will be called when the SDK is ready and Spotify.Player is available
	// <any> skips type checking on window
	(<any>window).onSpotifyWebPlaybackSDKReady = () => {
		// You can now initialize Spotify.Player and use the SDK

		useSpotify.setState({ sdkReady: true });

		const spotifyPlayerConstructorOptions: SpotifyPlayerConstructorOptions = {
			name: config.SPOTIFY_WEB_PLAYBACK_DEVICE_NAME,
			volume: config.SPOTIFY_WEB_PLAYBACK_DEFAULT_VOLUME,
			getOAuthToken: callback => {
				callback(getSpotifyToken());
			}
		};

		const player: SpotifyPlayer = new (<any>window).Spotify.Player(
			spotifyPlayerConstructorOptions
		);

		logSpotifyPlayer("Spotify player initialized %o", player);

		bindEventsToSpotifyPlayer(player);
		logSpotifyPlayer("Spotify player events bound");

		useSpotify.setState({ player });
	};
};

const connectSpotifyPlayer = async (): Promise<void> => {
	const { player } = useSpotify.getState();

	if (player) {
		await player.connect();
		logSpotifyPlayer("Spotify player connected");
	}
};

export {
	prepareSpotifyWebPlaybackSDKReadyCallback,
	connectSpotifyPlayer,
	logSpotifyPlayer
};
