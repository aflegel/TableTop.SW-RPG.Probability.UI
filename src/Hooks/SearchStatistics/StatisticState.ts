import { PoolDice } from "../../Models/PoolDice";
import { PoolContainer } from "../../Models/PoolContainer";
import { DieType } from "../../Models/DieType";

export interface IStatisticsState {
	isLoading: boolean;
	negativePoolId: number;
	searchDice: PoolDice[];
	poolCombinationContainer: PoolContainer;
}

export const initialState: IStatisticsState = {
	isLoading: true,
	negativePoolId: 0,
	searchDice: [{ dieId: DieType.Ability, quantity: 1 }, { dieId: DieType.Difficulty, quantity: 1 }],
	poolCombinationContainer: {},
};

export const unloadedState: IStatisticsState = {
	poolCombinationContainer: {},
	searchDice: [{ dieId: DieType.Ability, quantity: 1 }, { dieId: DieType.Difficulty, quantity: 1 }],
	isLoading: false,
	negativePoolId: 0
};
