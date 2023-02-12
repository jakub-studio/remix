export const extractDataFromSpotifyURL = (url: string) => {
	// clear anything after the ? (query params)
	const urlWithoutQueryParams = url.split("?")[0];

	// take the last part of the url (https://open.spotify.com/track/ID < this is the ID)
	const urlParts = urlWithoutQueryParams.split("/");
	const id = urlParts[urlParts.length - 1];

	return {
		uri: `spotify:track:${id}`,
		id
	};
};
