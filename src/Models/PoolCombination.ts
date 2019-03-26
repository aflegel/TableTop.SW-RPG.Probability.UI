import { PoolStatistic } from "./PoolStatistic";
import { PoolDice } from "./PoolDice";

export interface PoolCombination {
	poolCombinationStatistics: PoolStatistic[];
	positivePoolDice: PoolDice[];
	negativePoolDice: PoolDice[];
}
