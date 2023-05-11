import useSpotify from "./state";
import { getSpotifyToken } from "./token";
import { Track } from "./types";

export const WEB_API_BASE = "https://api.spotify.com/v1";

export const getTrackRequestUrl = (id: string): string => {
	return WEB_API_BASE + `/tracks/${id}`;
};

export const playbackUrl = WEB_API_BASE + "/me/player/play";
export const tracksUrl = WEB_API_BASE + "/tracks";

/**
 * Fetches track data from the Spotify Web API.
 * @param id The Spotify ID of the track. NOT the URI.
 * @returns Track data.
 * @throws Error if the request fails.
 * @see https://developer.spotify.com/documentation/web-api/reference/tracks/get-track/
 * @see https://developer.spotify.com/documentation/web-api/reference/object-model/#track-object-full
 */

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

export const requestTracksData = async (ids: string[]): Promise<Track[]> => {
	const response = await fetch(
		tracksUrl + "?ids=" + encodeURIComponent(ids.join(",")),
		{
			method: "GET",
			headers: {
				"Authorization": `Bearer ${getSpotifyToken()}`,
				"Content-Type": "application/json"
			}
		}
	);

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	const data = await response.json();
	return data.tracks;
};

export const playTrack = async (
	uri: string,
	offsetMs?: number
): Promise<void> => {
	const body: Record<string, unknown> = {
		uris: [uri]
	};

	if (offsetMs) {
		body["position_ms"] = offsetMs;
	}

	const response = await fetch(
		playbackUrl + "?device_id=" + useSpotify.getState().deviceId,
		{
			method: "PUT",
			headers: {
				"Authorization": `Bearer ${getSpotifyToken()}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		}
	);

	if (!response.ok) {
		throw new Error(response.statusText);
	}
};
