// https://developer.spotify.com/documentation/web-playback-sdk/reference/#api-spotify-player

interface WebPlaybackPlayer {
	device_id: string;
}

type SpotifyTrackTypes = "track" | "episode" | "ad";
type SpotifyMediaTypes = "audio" | "video";

interface WebPlaybackTrack {
	uri: string; // Spotify URI
	id: string | null; // Spotify ID from URI (can be null)
	type: SpotifyTrackTypes; // Content type: can be "track", "episode" or "ad"
	media_type: SpotifyMediaTypes; // Type of file: can be "audio" or "video"
	name: string; // Name of content
	is_playable: boolean; // Flag indicating whether it can be played
	album: {
		uri: string; // Spotify Album URI
		name: string;
		images: Array<{ url: string }>;
	};
	artists: Array<{ uri: string; name: string }>;
}

type SpotifyRepeatMode = 0 | 1 | 2; // The repeat mode. No repeat mode is 0, repeat context is 1 and repeat track is 2.

interface WebPlaybackState {
	context: {
		uri: string; // The URI of the context (can be null)
		metadata: {}; // Additional metadata for the context (can be null)
	};
	disallows: {
		// A simplified set of restriction controls for
		pausing: boolean; // The current track. By default, these fields
		peeking_next: boolean; // will either be set to false or undefined, which
		peeking_prev: boolean; // indicates that the particular operation is
		resuming: boolean; // allowed. When the field is set to `true`, this
		seeking: boolean; // means that the operation is not permitted. For
		skipping_next: boolean; // example, `skipping_next`, `skipping_prev` and
		skipping_prev: boolean; // `seeking` will be set to `true` when playing an
		// ad track.
	};
	paused: boolean; // Whether the current track is paused.
	position: number; // The position_ms of the current track.
	repeat_mode: SpotifyRepeatMode; // The repeat mode. No repeat mode is 0,
	// repeat context is 1 and repeat track is 2.
	shuffle: boolean; // True if shuffled, false otherwise.
	track_window: {
		current_track: WebPlaybackTrack; // The track currently on local playback
		previous_tracks: WebPlaybackTrack[]; // Previously played tracks. Number can vary.
		next_tracks: WebPlaybackTrack[]; // Tracks queued next. Number can vary.
	};
}

interface WebPlaybackError {
	message: string;
}

interface SpotifyPlayerConstructorOptions {
	name: string;
	getOAuthToken: (callback: (token: string) => void) => void;
	volume?: number;
}

declare class SpotifyPlayer {
	constructor(opts: SpotifyPlayerConstructorOptions);
	connect(): Promise<boolean>;
	disconnect(): Promise<void>;

	getCurrentState(): Promise<WebPlaybackState | null>;
	setName(name: string): Promise<void>;
	getVolume(): Promise<number>; // Returns a float between 0 and 1
	setVolume(volume: number): Promise<void>; // Accepts a float between 0 and 1

	pause(): Promise<void>;
	resume(): Promise<void>;
	togglePlay(): Promise<void>;
	seek(position_ms: number): Promise<void>;
	previousTrack(): Promise<void>;
	nextTrack(): Promise<void>;

	activateElement(): Promise<void>;

	// TODO? add "on" alias for addListener
	// Regular Events
	addListener(
		event: "ready",
		callback: (data: WebPlaybackPlayer) => void
	): boolean;
	addListener(
		event: "not_ready",
		callback: (data: WebPlaybackPlayer) => void
	): boolean;
	addListener(
		event: "player_state_changed",
		callback: (state: WebPlaybackState) => void
	): boolean;
	addListener(event: "autoplay_failed", callback: () => void): boolean;

	// Error Events
	addListener(
		event: "initialization_error",
		callback: (error: WebPlaybackError) => void
	): boolean;
	addListener(
		event: "authentication_error",
		callback: (error: WebPlaybackError) => void
	): boolean;
	addListener(
		event: "account_error",
		callback: (error: WebPlaybackError) => void
	): boolean;
	addListener(
		event: "playback_error",
		callback: (error: WebPlaybackError) => void
	): boolean;

	removeListener(event: string, callback?: Function): boolean;
}

export type {
	SpotifyPlayer,
	SpotifyPlayerConstructorOptions,
	WebPlaybackPlayer,
	WebPlaybackTrack,
	WebPlaybackState,
	WebPlaybackError,
	SpotifyTrackTypes,
	SpotifyMediaTypes,
	SpotifyRepeatMode,
};
