import { PoolCombination } from "../../../Models/Statistics";

export const FetchStatisticsAction = "FETCH_STATISTICS";
export type FetchStatisticsAction = typeof FetchStatisticsAction;

export interface IFetchStatistics {
	type: FetchStatisticsAction;
	poolCombination: PoolCombination;
}
