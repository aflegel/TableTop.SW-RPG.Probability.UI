import { useReducer } from "react";

import { reducer } from "./Reducer";
import { initialState } from "./StatisticState";
import { IStatisticsService, statisticsServiceSingleton } from "../../Services/StatisticsService";
import { fetchStatisticsAction, addAction, removeAction } from "./Actions";
import { DieType } from "../../Models/DieType";
import { PoolCombination } from "../../Models/PoolCombination";

/**
 * Logged Coffee custom hook. Wraps state and API interactions for Logged Coffee.
 */
export const useStatistics = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const service: IStatisticsService = statisticsServiceSingleton;

	/**
	 * Get all logged coffee from the API.
	 */
	const getStatisticsAsync = (): void => {
		// dispatch(requestAction());
		service.getAllAsync(state.searchDice).then((pool: PoolCombination) => {
			dispatch(fetchStatisticsAction(pool));
		});
	};

	const addSearchDie = (die: DieType): void => {
		dispatch(addAction(die));
	};

	const removeSearchDie = (die: DieType): void => {
		dispatch(removeAction(die));
	};

	return { state, getStatisticsAsync, addSearchDie, removeSearchDie };
};
