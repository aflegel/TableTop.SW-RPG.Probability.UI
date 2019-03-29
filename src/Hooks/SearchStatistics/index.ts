import { useReducer } from "react";

import { reducer } from "./Reducer";
import { initialState } from "./StatisticState";
import { IStatisticsService, statisticsServiceSingleton } from "../../Services/StatisticsService";
import { requestAction, fetchStatisticsAction, addAction, removeAction } from "./Actions";
import { PoolContainer } from "../../Models/PoolContainer";
import { PoolDice } from "../../Models/PoolDice";

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
		dispatch(requestAction());
		service.getAllAsync(initialState.searchDice).then((pool: PoolContainer) => {
			dispatch(fetchStatisticsAction(pool));
		});
	};

	const addSearchDie = (die: PoolDice): void => {
		dispatch(addAction(die));
	};

	const removeSearchDie = (die: PoolDice): void => {
		dispatch(removeAction(die));
	};

	return { state, getStatisticsAsync, addSearchDie, removeSearchDie };
};

/*
export const actionCreators = {
	addSearchDie: (poolDie: PoolDice) => <AddDieAction>{ type: "ADD_SEARCH_DIE", poolDie: poolDie },
	removeSearchDie: (poolDie: PoolDice) => <RemoveDieAction>{ type: "REMOVE_SEARCH_DIE", poolDie: poolDie },
	requestDiceStatistics: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
		// Only load data if it's something we don't already have (and are not already loading)
		//if (positivePoolId !== getState().diceStatistics.positivePoolId) {

		// addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
		dispatch({ type: "REQUEST_DICE_STATISTICS" });
		//}
	}
};
*/
