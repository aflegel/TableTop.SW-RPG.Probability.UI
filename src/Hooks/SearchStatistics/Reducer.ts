import { IStatisticsState } from "./StatisticState";
import { StatisticsApiActions } from "./Actions";
import { FetchStatisticsAction } from "./Actions/FetchStatistics";

export const reducer = (state: IStatisticsState, action: StatisticsApiActions): IStatisticsState => {
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
