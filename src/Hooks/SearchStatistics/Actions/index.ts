import { IRequestStatistics, RequestStatisticsAction } from "./RequestStatistics";
import { IFetchStatistics, FetchStatisticsAction } from "./FetchStatistics";
import { PoolCombination } from "../../../Models/PoolCombination";

// Action interfaces
export type StatisticsApiActions = IRequestStatistics | IFetchStatistics;

// Action creators
export const fetchStatisticsAction = (combination: PoolCombination): IFetchStatistics => ({
	poolCombination: combination,
	type: FetchStatisticsAction
});

export const requestAction = (): IRequestStatistics => ({
	type: RequestStatisticsAction
});
