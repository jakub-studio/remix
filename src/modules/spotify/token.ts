const __spotifyOAuthToken__ = import.meta.env.VITE_SPOTIFY_TOKEN;

export const getSpotifyToken = (): string => {
	return __spotifyOAuthToken__;
};
