import { PropsWithChildren, useCallback, useState } from "react";
import c from "clsx";

import initGame from "@/modules/state/init";

import useSpotify from "@/modules/spotify/state";
import { setSpotifyToken } from "@/modules/spotify/token";
import { connectSpotifyPlayer } from "@/modules/spotify";
import { progressGameFlow } from "@/modules/state";

const ConfigWrapper: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="w-full">
			<div className="mx-12 my-10">
				<h1 className="font-bold">Remix Icebreaker Game</h1>
				<hr className="my-2 border-gray-600 w-full" />
				{children}
			</div>
		</div>
	);
};

const TOKEN_INPUT_NAME = "spotify-token";
const CONFIG_TEXTAREA_NAME = "game-config";

const Config: React.FC = () => {
	const sdkReady = useSpotify(s => s.sdkReady);
	const [loading, setLoading] = useState<boolean>(false);

	const [tokenValue, setTokenValue] = useState<string>("");
	const [tokenError, setTokenError] = useState<string | null>(null);
	const onTokenValueChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setTokenValue(e.target.value);
			setTokenError(null);
		},
		[]
	);

	const [configValue, setConfigValue] = useState<string>("");
	const [configError, setConfigError] = useState<string | null>(null);
	const onConfigValueChange = useCallback(
		(e: React.ChangeEvent<HTMLTextAreaElement>) => {
			setConfigValue(e.target.value);
			setConfigError(null);
		},
		[]
	);

	const onSubmit = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.preventDefault();

			if (tokenValue.length === 0)
				return setTokenError("Token cannot be empty");

			if (configValue.length === 0)
				return setConfigError("Config cannot be empty");

			try {
				const parsed = JSON.parse(configValue);

				setLoading(true);

				setSpotifyToken(tokenValue);
				connectSpotifyPlayer()
					.then(() => {
						// Prepare game state/data
						initGame(parsed);
						// Go to title screen
						progressGameFlow();
					})
					.catch(e => {
						setLoading(false);
						setTokenError(e);
					});

				// todo
			} catch (e) {
				setConfigError(
					e && e.toString && typeof e.toString === "function"
						? e.toString()
						: "JSON parsing error"
				);
				console.error(e);
			}
		},
		[tokenValue, configValue]
	);

	if (loading) return <ConfigWrapper>Loading...</ConfigWrapper>;

	return (
		<ConfigWrapper>
			<div className="flex flex-col gap-2">
				{/* Spotify Oauth Token */}
				<div>
					<div className="flex items-center gap-2">
						<label htmlFor={TOKEN_INPUT_NAME} className="text-sm">
							Spotify Oauth Token
						</label>
						{tokenError && (
							<span className="text-red-500 text-xs">{tokenError}</span>
						)}
					</div>
					<a
						href="https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#authenticating-with-spotify"
						className="text-xs text-blue-500 hover:underline"
						rel="noopener noreferrer"
						target="_blank"
					>
						Generate Token
					</a>
				</div>
				<input
					type="password"
					name={TOKEN_INPUT_NAME}
					className={c("border border-black p-1 text-xs whitespace-nowrap", {
						"border-red-500 bg-red-200 text-red-900": tokenError
					})}
					placeholder="kVfjku5iFTDGhXmsjFHnDk3dbmKziGuo"
					value={tokenValue}
					onChange={onTokenValueChange}
				/>

				{/* Game Config */}
				<div className="flex items-center gap-2">
					<label htmlFor={CONFIG_TEXTAREA_NAME} className="text-sm">
						Game Config (.json)
					</label>
					{configError && (
						<span className="text-red-500 text-xs">{configError}</span>
					)}
				</div>
				<textarea
					name={CONFIG_TEXTAREA_NAME}
					className={c("border border-black p-1 text-xs whitespace-nowrap", {
						"border-red-500 bg-red-200 text-red-900": configError
					})}
					spellCheck={false}
					placeholder="Paste your game config here. { ... }"
					value={configValue}
					rows={20}
					onChange={onConfigValueChange}
				/>
			</div>

			{sdkReady ? (
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 text-sm"
					onClick={onSubmit}
				>
					Start Game
				</button>
			) : (
				<div className="text-sm text-gray-500 mt-4">
					Spotify SDK is not ready yet
				</div>
			)}
		</ConfigWrapper>
	);
};

export default Config;
