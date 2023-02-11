import { useCallback, useState } from "react";

const CONFIG_TEXTAREA_NAME = "game-config";

const Config: React.FC = () => {
	const [config, setConfig] = useState<string>("");

	const onSubmit = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
	}, []);

	return (
		<div className="w-full">
			<div className="m-12">
				<h1 className="font-bold">Remix Icebreaker Game</h1>
				<hr className="my-2 border-gray-600 w-full" />
				<div className="flex flex-col gap-2">
					<label htmlFor={CONFIG_TEXTAREA_NAME} className="text-sm">
						Game Config (.json)
					</label>
					<textarea
						name={CONFIG_TEXTAREA_NAME}
						className="border border-black p-1 text-xs whitespace-nowrap"
						spellCheck={false}
						placeholder="Paste your game config here. { ... }"
						value={config}
						rows={20}
						onChange={e => setConfig(e.target.value)}
					/>
				</div>

				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 text-sm"
					onClick={onSubmit}>
					Start Game
				</button>
			</div>
		</div>
	);
};

export default Config;
