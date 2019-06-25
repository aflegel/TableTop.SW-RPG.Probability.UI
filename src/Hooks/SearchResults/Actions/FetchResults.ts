import { PoolCombination } from "../../../Models";
import { PoolResult } from "../../../Models/PoolResult";

export const FetchResultsAction = "FETCH_RESULTS";
export type FetchResultsAction = typeof FetchResultsAction;

export interface IFetchResults {
	type: FetchResultsAction;
	poolResult: PoolResult;
}
