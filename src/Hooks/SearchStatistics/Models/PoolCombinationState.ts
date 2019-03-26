import { PoolDice } from "../../../Models/PoolDice";
import { PoolContainer } from "../../../Models/PoolContainer";

// STATE - This defines the type of data maintained in the Redux store.
export interface PoolCombinationState {
	isLoading: boolean;
	negativePoolId: number;
	searchDice: PoolDice[];
	poolCombinationContainer: PoolContainer;
}
