import { PoolStatistic, PoolDice } from ".";
import { RollSymbol } from "./RollSymbol";

export interface PoolRoll {
	symbols: RollSymbol[]
	frequency: number;
}
