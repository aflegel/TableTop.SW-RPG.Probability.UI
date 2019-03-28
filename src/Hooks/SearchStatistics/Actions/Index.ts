import { PoolDice } from "../../../Models/PoolDice";
import { PoolContainer } from "../../../Models/PoolContainer";
import { IAddDie, AddDieAction } from "./AddDie";
import { IRemoveDie, RemoveDieAction } from "./RemoveDie";
import { IRequestStatistics, RequestStatisticsAction } from "./RequestStatistics";
import { IFetchStatistics, FetchStatisticsAction } from "./FetchStatistics";

// Action interfaces
export type StatisticsApiActions = IRequestStatistics | IFetchStatistics | IAddDie | IRemoveDie;

// Action creators
export const fetchStatisticsAction = (poolContainer: PoolContainer): IFetchStatistics => ({
	poolContainer: poolContainer,
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

export const requestAction = (): IRequestStatistics => ({
	type: RequestStatisticsAction
});
