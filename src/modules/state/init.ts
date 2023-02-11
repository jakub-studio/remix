import useGame from ".";
import { GameConfig } from "./types";

const initGame = (config: GameConfig): void => {
	useGame.setState({ config });
};

export default initGame;
