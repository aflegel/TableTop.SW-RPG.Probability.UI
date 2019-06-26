import { useReducer } from "react";

import { Reducer } from "./Reducer";
import { InitialState } from "./StatisticState";
import { IStatisticsService, StatisticsServiceSingleton } from "./Service";
import { fetchStatisticsAction, fetchResultsAction } from "./Actions";
import { PoolCombination, PoolDice, PoolResult } from "../../Models";

export * from "./StatisticState";
export * from "./Actions";

/**
 * Wraps API interactions to search for dice results
 */
export const useStatistics = () => {
	const [statistics, dispatch] = useReducer(Reducer, InitialState);
	const service: IStatisticsService = StatisticsServiceSingleton;

	/**
	 * Gets dice results from the API.
	 */
	const getStatisticsAsync = (dice: PoolDice[]): void => {
		service.GetAllAsync(dice).then((pool: PoolCombination) => {
			dispatch(fetchStatisticsAction(pool));
		});
	};

	const getResultsAsync = (dice: PoolDice[]): void => {
		service.GetResultsAsync(dice).then((pool: PoolResult) => {
			dispatch(fetchResultsAction(pool));
		});
	};

	return { statistics, getStatisticsAsync, getResultsAsync };
};
