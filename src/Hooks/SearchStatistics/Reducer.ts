import { IStatisticsState } from ".";
import { StatisticsApiActions, FetchStatisticsAction, FetchResultsAction } from "./Actions";

export const Reducer = (state: IStatisticsState, action: StatisticsApiActions): IStatisticsState => {
	switch (action.type) {
		case FetchStatisticsAction:
			if (action.poolCombination) {
				return {
					...state,
					poolCombination: action.poolCombination,
					isLoading: false
				};
			} else {
				return {
					...state,
					poolCombination: {
						poolStatistics: [],
						dice: []
					},
					isLoading: false
				};
			}
		case FetchResultsAction:
			if (action.poolResult) {
				return {
					...state,
					poolResult: action.poolResult,
					isLoading: false
				};
			} else {
				return {
					...state,
					poolResult: {
						poolResults: [],
						dice: []
					},
					isLoading: false
				};
			}
		default:
			return state;
	}
};
