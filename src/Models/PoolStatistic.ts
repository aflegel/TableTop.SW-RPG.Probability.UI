import { DieSymbol } from "./DieSymbol";

export interface PoolStatistic {
	symbol: DieSymbol;
	quantity: number;
	frequency: number;
	alternateTotal: number;
}
