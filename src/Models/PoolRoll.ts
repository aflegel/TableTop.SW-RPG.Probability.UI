import { PoolDice } from ".";
import { PoolResult } from "./PoolResult";

export interface PoolRoll {
	positiveResults: PoolResult[];
	negativeResults: PoolResult[];
	dice: PoolDice[];
}
