import { PoolDice } from "..";
import { PoolStatistic } from ".";

export interface PoolCombination {
	statistics: PoolStatistic[];
	dice: PoolDice[];
}
