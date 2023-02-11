import { logSpotify, logSpotifyPlayer } from "./log";
import { create } from "zustand";

import { SpotifyPlayer } from "./types";

interface SpotifyState {
	player: SpotifyPlayer | null;
	deviceId: string | null;
	connected: boolean;
	sdkReady: boolean;
}

const useSpotify = create<SpotifyState>((set, get) => ({
	player: null,
	deviceId: null,
	connected: false,
	sdkReady: false
}));

useSpotify.subscribe(state => {
	logSpotify("Spotify state updated %o", state);
});

// devtools/debugging
Object.defineProperty(window, "spotifyState", {
	value: useSpotify
});
Object.defineProperty(window, "spotifyDc", {
	value: async () => {
		await useSpotify.getState().player?.disconnect();
		logSpotifyPlayer("Spotify player disconnected");
	}
});

export default useSpotify;
