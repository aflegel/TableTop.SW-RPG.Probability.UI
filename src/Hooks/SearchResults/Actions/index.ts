import { IFetchResults, FetchResultsAction } from "./FetchResults";
import { PoolCombination } from "../../../Models";
import { PoolResult } from "../../../Models/PoolResult";

export * from "./FetchResults";

// Action interfaces
export type ResultApiActions = IFetchResults;

// Action creators
export const fetchResultsAction = (combination: PoolResult): IFetchResults => ({
	poolResult: combination,
	type: FetchResultsAction
});
