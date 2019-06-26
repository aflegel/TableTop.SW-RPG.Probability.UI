import { PoolDice, PoolCombination, PoolRoll } from "../../Models";

export interface IStatisticsState {
	isLoading: boolean;
	poolCombination: PoolCombination;
	poolRoll: PoolRoll;
	searchDice: PoolDice[];
}

export const InitialState: IStatisticsState = {
	isLoading: true,
	poolRoll: {
		positiveResults: [],
		negativeResults: [],
		dice: []
	},
	poolCombination: {
		poolStatistics: [],
		dice: []
	},
	searchDice: [{ dieType: "Ability", quantity: 1 }, { dieType: "Difficulty", quantity: 1 }]
};
