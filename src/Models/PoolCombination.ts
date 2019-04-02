import { PoolStatistic } from "./PoolStatistic";
import { PoolDice } from "./PoolDice";

export interface PoolCombination {
	poolStatistics: PoolStatistic[];
	dice: PoolDice[];
}
