import { IFetchStatistics, FetchStatisticsAction } from "./FetchStatistics";
import { PoolCombination } from "../../../Models";

export * from "./FetchStatistics";

// Action interfaces
export type StatisticsApiActions = IFetchStatistics;

// Action creators
export const fetchStatisticsAction = (combination: PoolCombination): IFetchStatistics => ({
	poolCombination: combination,
	type: FetchStatisticsAction
});
