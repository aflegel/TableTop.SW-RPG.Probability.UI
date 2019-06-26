import { IFetchStatistics, FetchStatisticsAction } from "./FetchStatistics";
import { IFetchResults, FetchResultsAction } from "./FetchResults";
import { PoolCombination, PoolRoll } from "../../../Models";

export * from "./FetchStatistics";
export * from "./FetchResults";

// Action interfaces
export type StatisticsApiActions = IFetchStatistics | IFetchResults;


// Action creators
export const fetchStatisticsAction = (combination: PoolCombination): IFetchStatistics => ({
	poolCombination: combination,
	type: FetchStatisticsAction
});

export const fetchResultsAction = (rolls: PoolRoll): IFetchResults => ({
	poolRoll: rolls,
	type: FetchResultsAction
});
