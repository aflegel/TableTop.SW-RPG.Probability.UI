import { PoolRoll } from "../../../Models";

export const FetchResultsAction = "FETCH_RESULTS";
export type FetchResultsAction = typeof FetchResultsAction;

export interface IFetchResults {
	type: FetchResultsAction;
	poolRoll: PoolRoll;
}
