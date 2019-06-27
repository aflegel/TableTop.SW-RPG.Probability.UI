import axios from "axios";
import { useReducer } from "react";

import { Reducer } from "./Reducer";
import { InitialState } from "./StatisticState";
import { fetchStatisticsAction, fetchResultsAction } from "./Actions";
import { PoolDice } from "../../Models";

export * from "./StatisticState";
export * from "./Actions";

/**
 * Wraps API interactions to search for dice results
 */
export const useStatistics = () => {
	const [statistics, dispatch] = useReducer(Reducer, InitialState);

	/**
	 * Gets dice results from the API.
	 */
	const getStatisticsAsync = async (dice: PoolDice[]): Promise<void> => {
		const result = await axios.post(`http://localhost:62546/Search`, dice, { headers: { "Content-Type": "application/json; charset=utf-8" } });
		dispatch(fetchStatisticsAction(result.data));
	};

	const getResultsAsync = async (dice: PoolDice[]): Promise<void> => {
		const result = await axios.post(`http://localhost:62546/Roll`, dice, { headers: { "Content-Type": "application/json; charset=utf-8" } });
		dispatch(fetchResultsAction(result.data));
	};

	return { statistics, getStatisticsAsync, getResultsAsync };
};
