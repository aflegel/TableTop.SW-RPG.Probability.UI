import { useReducer } from "react";

import { Reducer } from "./Reducer";
import { InitialState } from "./RollState";
import { IResultsService, ResultServiceSingleton } from "./Service";
import { fetchResultsAction } from "./Actions";
import { PoolCombination, PoolDice } from "../../Models";
import { PoolResult } from "../../Models/PoolResult";

export * from "./RollState";
export * from "./Actions";

/**
 * Wraps API interactions to search for dice results
 */
export const useResults = () => {
	const [results, dispatch] = useReducer(Reducer, InitialState);
	const service: IResultsService = ResultServiceSingleton;

	/**
	 * Gets dice results from the API.
	 */
	const getResultsAsync = (dice: PoolDice[]): void => {
		service.GetAllAsync(dice).then((pool: PoolResult) => {
			dispatch(fetchResultsAction(pool));
		});
	};

	return { results, getResultsAsync };
};
