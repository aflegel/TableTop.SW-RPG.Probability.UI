import { PoolContainer } from "../../../Models/PoolContainer";
import { IAddDie, AddDieAction } from "./AddDie";
import { IRemoveDie, RemoveDieAction } from "./RemoveDie";
import { IRequestStatistics, RequestStatisticsAction } from "./RequestStatistics";
import { IFetchStatistics, FetchStatisticsAction } from "./FetchStatistics";
import { DieType } from "../../../Models/DieType";

// Action interfaces
export type StatisticsApiActions = IRequestStatistics | IFetchStatistics | IAddDie | IRemoveDie;

// Action creators
export const fetchStatisticsAction = (poolContainer: PoolContainer): IFetchStatistics => ({
	poolContainer: poolContainer,
	type: FetchStatisticsAction
});

export const addAction = (dice: DieType): IAddDie => ({
	dieType: dice,
	type: AddDieAction
});

export const removeAction = (dice: DieType): IRemoveDie => ({
	dieType: dice,
	type: RemoveDieAction
});

export const requestAction = (): IRequestStatistics => ({
	type: RequestStatisticsAction
});
