export const RequestStatisticsAction = "REQUEST_STATISTICS";
export type RequestStatisticsAction = typeof RequestStatisticsAction;

export interface IRequestStatistics {
	type: RequestStatisticsAction;
}
