import { FetchStatistics, FetchStatisticsAction } from "./FetchStatistics";
import { FetchResults, FetchResultsAction } from "./FetchResults";
import { PoolCombination } from "../../../Models/Statistics";
import { RollContainer } from "../../../Models/Roll";

export * from "./FetchStatistics";
export * from "./FetchResults";

// Action interfaces
export type StatisticsApiActions = FetchStatistics | FetchResults;


// Action creators
export const fetchStatisticsAction = (combination: PoolCombination): FetchStatistics => ({
	poolCombination: combination,
	type: FetchStatisticsAction
});

export const fetchResultsAction = (rolls: RollContainer): FetchResults => ({
	poolRoll: rolls,
	type: FetchResultsAction
});
