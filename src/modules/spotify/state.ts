import { logSpotify } from "./log";
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

Object.defineProperty(window, "spotifyState", {
	value: useSpotify
});

logSpotify("Spotify state initialized %o", useSpotify.getState());

export default useSpotify;
