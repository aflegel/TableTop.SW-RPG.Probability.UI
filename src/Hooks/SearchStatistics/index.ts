import { useReducer } from "react";

import { Reducer } from "./Reducer";
import { InitialState } from "./StatisticState";
import { IStatisticsService, StatisticsServiceSingleton } from "../../Services/StatisticsService";
import { fetchStatisticsAction } from "./Actions";
import { PoolCombination } from "../../Models/PoolCombination";
import { PoolDice } from "../../Models/PoolDice";

/**
 * Wraps API interactions to search for dice results
 */
export const useStatistics = () => {
	const [state, dispatch] = useReducer(Reducer, InitialState);
	const service: IStatisticsService = StatisticsServiceSingleton;

	/**
	 * Gets dice results from the API.
	 */
	const getStatisticsAsync = (dice: PoolDice[]): void => {
		service.GetAllAsync(dice).then((pool: PoolCombination) => {
			dispatch(fetchStatisticsAction(pool));
		});
	};

	return { state, getStatisticsAsync };
};
