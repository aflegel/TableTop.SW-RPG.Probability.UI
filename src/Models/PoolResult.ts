import { PoolStatistic, PoolDice } from ".";
import { PoolRoll } from "./PoolRoll";

export interface PoolResult {
	poolResults: PoolRoll[];
	dice: PoolDice[];
}
