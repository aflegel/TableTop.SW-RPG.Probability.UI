import { PoolDice } from "../../Models";
import { RollContainer } from "../../Models/Roll";
import { PoolCombination } from "../../Models/Statistics";

export interface StatisticsState {
	isLoading: boolean;
	poolCombination: PoolCombination;
	poolRoll: RollContainer;
	searchDice: PoolDice[];
}

export const InitialState: StatisticsState = {
	isLoading: true,
	poolRoll: {
		positiveRolls: {
			dice: [],
			results: []
		},
		negativeRolls: {
			dice: [],
			results: []
		},
	},
	poolCombination: {
		statistics: [],
		dice: []
	},
	searchDice: [{ dieType: "Ability", quantity: 1 }, { dieType: "Difficulty", quantity: 1 }]
};
