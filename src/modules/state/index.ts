import { create } from "zustand";

interface GameState {
	cache: Record<string, unknown>;
	config: any; // GameConfig;
	rounds: []; // GameRound[];
	current: {
		round: number;
		roundStage: number; // or enum
		elimination: unknown;
	};
}

/* const useBearStore = create<GameState>()(set => ({
	bears: 0,
	increase: by => set(state => ({ bears: state.bears + by })),
})); */
