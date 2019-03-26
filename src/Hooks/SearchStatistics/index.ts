import { useReducer } from 'react';

import { reducer } from './Reducer';
import { initialState } from './StatisticState';
import { IStatisticsService, statisticsServiceSingleton } from '../../services/DiceService';
import { requestAction, fetchStatisticsAction } from './Actions';
import { PoolContainer } from '../../Models/PoolContainer';

/**
 * Logged Coffee custom hook. Wraps state and API interactions for Logged Coffee.
 */
export const useStatistics = () => {
	const [ state, dispatch ] = useReducer(reducer, initialState);
	const service: IStatisticsService = statisticsServiceSingleton;

	/**
	 * Get all logged coffee from the API.
	 */
	const getStatisticsAsync = (): void => {
		dispatch(requestAction());
		service.getAllAsync()
			.then((pool: PoolContainer) => {
				dispatch(fetchStatisticsAction(pool));
			});
	};


	return { state, getStatisticsAsync };
};

/*
export const actionCreators = {
	addSearchDie: (poolDie: PoolDice) => <AddDieAction>{ type: "ADD_SEARCH_DIE", poolDie: poolDie },
	removeSearchDie: (poolDie: PoolDice) => <RemoveDieAction>{ type: "REMOVE_SEARCH_DIE", poolDie: poolDie },
	requestDiceStatistics: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
		// Only load data if it's something we don't already have (and are not already loading)
		//if (positivePoolId !== getState().diceStatistics.positivePoolId) {
		const data = JSON.stringify(getState().diceStatistics.searchDice);

		const fetchTask = fetch(`api/Search/GetStatistics?data=${data}`)
			.then(response => response.json() as Promise<PoolContainer>)
			.then(data => {
				dispatch({ type: "RECEIVE_DICE_STATISTICS", poolCombinationContainer: data });
			});

		// addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
		dispatch({ type: "REQUEST_DICE_STATISTICS" });
		//}
	}
};
*/
