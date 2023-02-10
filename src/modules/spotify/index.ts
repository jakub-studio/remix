import config from "@/config";
import { create } from "zustand";

import { SpotifyPlayer, SpotifyPlayerConstructorOptions } from "./types";
import { bindEventsToSpotifyPlayer } from "./events";
import { logSpotify, logSpotifyPlayer } from "./log";

interface SpotifyState {
	token: string;
	player: SpotifyPlayer | null;
	deviceId: string | null;
}

const useSpotify = create<SpotifyState>((set, get) => ({
	token: import.meta.env.VITE_SPOTIFY_TOKEN,
	player: null,
	deviceId: null,
}));

Object.defineProperty(window, "spotifyState", {
	value: useSpotify,
});

logSpotify("Spotify state initialized %o", useSpotify.getState());

const getSpotifyToken = (): string => {
	return useSpotify.getState().token;
};

const prepareSpotifyWebPlaybackSDKReadyCallback = (): void => {
	// Create a global callback called onSpotifyWebPlaybackSDKReady
	// This will be called when the SDK is ready
	// <any> skips type checking on window
	(<any>window).onSpotifyWebPlaybackSDKReady = () => {
		// You can now initialize Spotify.Player and use the SDK

		const spotifyPlayerConstructorOptions: SpotifyPlayerConstructorOptions = {
			name: config.SPOTIFY_WEB_PLAYBACK_DEVICE_NAME,
			getOAuthToken: callback => {
				callback(getSpotifyToken());
			},
			volume: 0.5,
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

export {
	useSpotify,
	prepareSpotifyWebPlaybackSDKReadyCallback,
	logSpotifyPlayer,
};
