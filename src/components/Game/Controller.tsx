import { useState } from "react";
import Config from "../Config";
import Title from "../Title";

enum GameFlow {
	CONFIG,
	INTRO,
	GAME,
	LEADER_BOARD,
	END
}

const GameFlowComponents: Record<GameFlow, React.FC> = {
	[GameFlow.CONFIG]: Config,
	[GameFlow.INTRO]: Title,
	[GameFlow.GAME]: () => <div>Game</div>,
	[GameFlow.LEADER_BOARD]: () => <div>Leader Board</div>,
	[GameFlow.END]: () => <div>End</div>
};

const GameController: React.FC = () => {
	const [GameFlowPosition, setGameFlowPosition] = useState(GameFlow.INTRO);

	const GameFlowComponent = GameFlowComponents[GameFlowPosition];

	return (
		<div data-role="game-root">
			<GameFlowComponent />
		</div>
	);
};

export default GameController;
