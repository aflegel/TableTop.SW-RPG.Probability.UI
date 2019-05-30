import { IStatisticsState } from ".";
import { StatisticsApiActions, FetchStatisticsAction } from "./Actions";

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
		default:
			return state;
	}
};
