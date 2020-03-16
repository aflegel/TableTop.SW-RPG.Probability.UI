import { StatisticsApiActions, FetchStatisticsAction, FetchResultsAction } from "./Actions";
import { InitialState , StatisticsState} from "./StatisticState";

export const Reducer = (state: StatisticsState, action: StatisticsApiActions): StatisticsState => {
	switch (action.type) {
		case FetchStatisticsAction:
			if (action.poolCombination) {
				return {
					...state,
					poolCombination: action.poolCombination,
					poolRoll: InitialState.poolRoll,
				};
			} else {
				return {
					...state,
					poolCombination: {
						statistics: [],
						dice: []
					},
				};
			}
		case FetchResultsAction:
			if (action.poolRoll) {
				return {
					...state,
					poolRoll: action.poolRoll,
				};
			} else {
				return {
					...state,
					poolRoll: InitialState.poolRoll,
				};
			}
		default:
			return state;
	}
};
