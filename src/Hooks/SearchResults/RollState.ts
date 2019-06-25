import { PoolDice, DieType, PoolCombination } from "../../Models";
import { PoolResult } from "../../Models/PoolResult";

export interface IRollState {
	isLoading: boolean;
	poolResult: PoolResult;
	searchDice: PoolDice[];
}

export const InitialState: IRollState = {
	isLoading: true,
	poolResult: {
		poolResults: [],
		dice: []
	},
	searchDice: [{ dieType: "Ability", quantity: 1 }, { dieType: "Difficulty", quantity: 1 }]
};
