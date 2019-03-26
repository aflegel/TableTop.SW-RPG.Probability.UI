import { PoolDice } from "../../Models/PoolDice";
import { PoolContainer } from "../../Models/PoolContainer";
import { IAddDie, AddDieAction } from "./Models/AddDie";
import { IRemoveDie, RemoveDieAction } from "./Models/RemoveDie";
import { IRequestStatistics } from "./Models/RequestDiceStatistics";
import { IFetchStatistics, FetchStatisticsAction } from "./Models/FetchStatistics";

// Action interfaces
export type StatisticsApiActions = IRequestStatistics | IFetchStatistics | IAddDie | IRemoveDie;

// Action creators
export const fetchStatisticsAction = (poolContainer: PoolContainer): IFetchStatistics => ({
	poolCombinationContainer: poolContainer,
	type: FetchStatisticsAction
});

export const addAction = (dice: PoolDice): IAddDie => ({
	poolDie: dice,
	type: AddDieAction
});

export const removeAction = (dice: PoolDice): IRemoveDie => ({
	poolDie: dice,
	type: RemoveDieAction
});
