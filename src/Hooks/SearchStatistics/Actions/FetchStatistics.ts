import { PoolContainer } from "../../../Models/PoolContainer";

export const FetchStatisticsAction = "FETCH_STATISTICS";
export type FetchStatisticsAction = typeof FetchStatisticsAction;

export interface IFetchStatistics {
	type: FetchStatisticsAction;
	poolCombinationContainer: PoolContainer;
}
