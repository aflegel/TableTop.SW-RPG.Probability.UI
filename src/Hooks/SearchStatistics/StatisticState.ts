import { PoolDice } from "../../Models/PoolDice";
import { PoolContainer } from "../../Models/PoolContainer";
import { DieType } from "../../Models/DieType";

export interface IStatisticsState {
	isLoading: boolean;
	poolContainer: PoolContainer;
	searchDice: PoolDice[];
}

export const initialState: IStatisticsState = {
	isLoading: true,
	poolContainer: {},
	searchDice: [{ dieId: DieType.Ability, quantity: 1 }, { dieId: DieType.Difficulty, quantity: 1 }],
};
