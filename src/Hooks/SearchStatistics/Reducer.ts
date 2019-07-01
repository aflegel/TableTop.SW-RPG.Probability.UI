import { IStatisticsState } from ".";
import { StatisticsApiActions, FetchStatisticsAction, FetchResultsAction } from "./Actions";
import { InitialState } from "./StatisticState";

export const Reducer = (state: IStatisticsState, action: StatisticsApiActions): IStatisticsState => {
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
					poolRoll: {
						positiveRolls: {
							dice: [],
							results: []
						},
						negativeRolls: {
							dice: [],
							results: []
						},
					},
					isLoading: false
				};
			}
		default:
			return state;
	}
};
