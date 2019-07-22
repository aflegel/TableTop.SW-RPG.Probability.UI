import { DieSymbol } from "..";

export interface PoolStatistic {
	symbol: DieSymbol;
	quantity: number;
	frequency: number;
	alternateTotal: number;
}
