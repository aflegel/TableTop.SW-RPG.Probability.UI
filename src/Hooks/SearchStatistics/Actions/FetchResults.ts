import { RollContainer } from "../../../Models/Roll";

export const FetchResultsAction = "FETCH_RESULTS";
export type FetchResultsAction = typeof FetchResultsAction;

export interface IFetchResults {
	type: FetchResultsAction;
	poolRoll: RollContainer;
}
