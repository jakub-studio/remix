import { SpotifyPlayer } from "./types";
import { logSpotifyPlayerEvents as log } from "./log";

const bindEventsToSpotifyPlayer = (player: SpotifyPlayer) => {
	player.addListener("ready", ({ device_id }) => {
		log("[ready] Ready with Device ID: %s", device_id);
	});

	player.addListener("not_ready", ({ device_id }) => {
		log("[not_ready] Device ID has gone offline: %s", device_id);
	});

	player.addListener("player_state_changed", state => {
		log("[player_state_changed] %o", state);
	});

	player.addListener("autoplay_failed", () => {
		log("[autoplay_failed] Autoplay failed. No further data available.");
	});

	player.addListener("initialization_error", ({ message }) => {
		log("[initialization_error] %s", message);
	});

	player.addListener("authentication_error", ({ message }) => {
		log("[authentication_error] %s", message);
	});

	player.addListener("account_error", ({ message }) => {
		log("[account_error] %s", message);
	});

	player.addListener("playback_error", ({ message }) => {
		log("[playback_error] %s", message);
	});
};

export { bindEventsToSpotifyPlayer };
