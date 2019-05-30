import { PoolDice, DieType, PoolCombination } from "../../Models";

export interface IStatisticsState {
	isLoading: boolean;
	poolCombination: PoolCombination;
	searchDice: PoolDice[];
}

export const InitialState: IStatisticsState = {
	isLoading: true,
	poolCombination: {
		poolStatistics: [],
		dice: []
	},
	searchDice: [{ dieId: DieType.Ability, quantity: 1 }, { dieId: DieType.Difficulty, quantity: 1 }]
};
