import { PoolDice } from "../../Models";
import { RollContainer } from "../../Models/Roll";
import { PoolCombination } from "../../Models/Statistics";

export type StatisticsState = StatisticsResults & StatisticsDice;

export interface StatisticsResults {
	poolCombination: PoolCombination;
	poolRoll: RollContainer;
}

export interface StatisticsDice {
	searchDice: PoolDice[];
}

export const InitialState: StatisticsState = {
	poolRoll: {
		positiveResults: [],
		negativeResults: [],
	},
	poolCombination: {
		statistics: [],
		dice: []
	},
	searchDice: [{ dieType: "Ability", quantity: 1 }, { dieType: "Difficulty", quantity: 1 }]
};
