import { IRollState } from ".";
import { ResultApiActions, FetchResultsAction } from "./Actions";

export const Reducer = (state: IRollState, action: ResultApiActions): IRollState => {
	switch (action.type) {
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
