import { PoolDice, DieType, PoolCombination, PoolResult } from "../../Models";

export interface IStatisticsState {
	isLoading: boolean;
	poolCombination: PoolCombination;
	poolResult: PoolResult;
	searchDice: PoolDice[];
}

export const InitialState: IStatisticsState = {
	isLoading: true,
	poolResult: {
		poolResults: [],
		dice: []
	},
	poolCombination: {
		poolStatistics: [],
		dice: []
	},
	searchDice: [{ dieType: "Ability", quantity: 1 }, { dieType: "Difficulty", quantity: 1 }]
};
