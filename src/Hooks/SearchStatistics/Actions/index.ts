import { IFetchStatistics, FetchStatisticsAction } from "./FetchStatistics";
import { PoolCombination } from "../../../Models/PoolCombination";

// Action interfaces
export type StatisticsApiActions = IFetchStatistics;

// Action creators
export const fetchStatisticsAction = (combination: PoolCombination): IFetchStatistics => ({
	poolCombination: combination,
	type: FetchStatisticsAction
});
