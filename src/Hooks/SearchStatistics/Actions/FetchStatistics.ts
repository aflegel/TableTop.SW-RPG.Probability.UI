import { PoolCombination } from "../../../Models";

export const FetchStatisticsAction = "FETCH_STATISTICS";
export type FetchStatisticsAction = typeof FetchStatisticsAction;

export interface IFetchStatistics {
	type: FetchStatisticsAction;
	poolCombination: PoolCombination;
}
