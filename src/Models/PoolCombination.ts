import { PoolCombinationStatistic } from "./PoolCombinationStatistic";
import { PoolDice } from "./PoolDice";

export interface PoolCombination {
	poolCombinationStatistics: PoolCombinationStatistic[];
	positivePoolDice: PoolDice[];
	negativePoolDice: PoolDice[];
}
