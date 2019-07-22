import { PoolDice } from "..";
import { RollResult } from ".";

export interface Roll {
	results: RollResult[];
	dice: PoolDice[];
}
