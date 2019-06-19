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
	searchDice: [{ dieType: "Ability", quantity: 1 }, { dieType: "Difficulty", quantity: 1 }]
};
