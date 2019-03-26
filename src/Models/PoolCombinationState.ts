import { PoolDice } from "./PoolDice";
import { PoolCombinationContainer } from "./PoolCombinationContainer";

// STATE - This defines the type of data maintained in the Redux store.
export interface PoolCombinationState {
	isLoading: boolean;
	negativePoolId: number;
	searchDice: PoolDice[];
	poolCombinationContainer: PoolCombinationContainer;
}
