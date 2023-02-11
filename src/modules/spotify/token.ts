let __spotifyOAuthToken__ = "";

export const getSpotifyToken = (): string => {
	return __spotifyOAuthToken__;
};

export const setSpotifyToken = (token: string): void => {
	__spotifyOAuthToken__ = token;
};
