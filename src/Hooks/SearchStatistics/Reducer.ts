import { StatisticsState } from ".";
import { StatisticsApiActions, FetchStatisticsAction, FetchResultsAction } from "./Actions";
import { InitialState } from "./StatisticState";

export const Reducer = (state: StatisticsState, action: StatisticsApiActions): StatisticsState => {
	switch (action.type) {
		case FetchStatisticsAction:
			if (action.poolCombination) {
				return {
					...state,
					poolCombination: action.poolCombination,
					poolRoll: InitialState.poolRoll,
					isLoading: false
				};
			} else {
				return {
					...state,
					poolCombination: {
						statistics: [],
						dice: []
					},
					isLoading: false
				};
			}
		case FetchResultsAction:
			if (action.poolRoll) {
				return {
					...state,
					poolRoll: action.poolRoll,
					isLoading: false
				};
			} else {
				return {
					...state,
					poolRoll: InitialState.poolRoll,
					isLoading: false
				};
			}
		default:
			return state;
	}
};
