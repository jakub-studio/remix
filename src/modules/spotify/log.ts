import createLog from "debug";

const logSpotify = createLog("spotify");

// API
const logSpotifyApi = logSpotify.extend("API");

// Player
const logSpotifyPlayer = logSpotify.extend("player");
const logSpotifyPlayerEvents = logSpotifyPlayer.extend("events");

export { logSpotify, logSpotifyApi, logSpotifyPlayer, logSpotifyPlayerEvents };
