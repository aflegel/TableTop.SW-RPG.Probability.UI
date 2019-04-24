import { useReducer } from "react";

import { reducer } from "./Reducer";
import { initialState } from "./StatisticState";
import { IStatisticsService, StatisticsServiceSingleton } from "../../Services/StatisticsService";
import { fetchStatisticsAction, addAction, removeAction } from "./Actions";
import { DieType } from "../../Models/DieType";
import { PoolCombination } from "../../Models/PoolCombination";

/**
 * Wraps API interactions to search for dice results
 */
export const useStatistics = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const service: IStatisticsService = StatisticsServiceSingleton;

	/**
	 * Gets dice results from the API.
	 */
	const getStatisticsAsync = (): void => {
		service.GetAllAsync(state.searchDice).then((pool: PoolCombination) => {
			dispatch(fetchStatisticsAction(pool));
		});
	};

	const addSearchDie = (die: DieType): void => dispatch(addAction(die));

	const removeSearchDie = (die: DieType): void => dispatch(removeAction(die));

	return { state, getStatisticsAsync, addSearchDie, removeSearchDie };
};
