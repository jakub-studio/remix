import { GameFlow } from "@/modules/state/types";
import useGame from "@/modules/state";

import Config from "@/components/Config";
import Title from "@/components/Title";
import Game from "@/components/Game";

const GameFlowComponents: Record<GameFlow, React.FC> = {
	[GameFlow.CONFIG]: Config,
	[GameFlow.INTRO]: Title,
	[GameFlow.GAME]: Game,
	[GameFlow.LEADER_BOARD]: () => <div>Leader Board</div>,
	[GameFlow.END]: () => <div>End</div>
};

const Controller: React.FC = () => {
	const flowState = useGame(s => s.flowState);
	const GameFlowComponent = GameFlowComponents[flowState];

	return (
		<div data-role="game-root">
			<GameFlowComponent />
		</div>
	);
};

export default Controller;
