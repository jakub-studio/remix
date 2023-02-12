import { getSpotifyToken } from "./token";
import { Track } from "./types";

export const WEB_API_BASE = "https://api.spotify.com/v1";

export const getTrackRequestUrl = (id: string): string => {
	return WEB_API_BASE + `/tracks/${id}`;
};

export const requestTrackData = async (id: string): Promise<Track> => {
	const url = getTrackRequestUrl(id);
	const response = await fetch(url, {
		method: "GET",
		headers: {
			"Authorization": `Bearer ${getSpotifyToken()}`,
			"Content-Type": "application/json"
		}
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	const data = await response.json();
	return data;
};
