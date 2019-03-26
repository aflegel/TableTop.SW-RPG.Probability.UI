import { DieSymbol } from "./DieSymbol";

export interface PoolCombinationStatistic {
	symbol: DieSymbol;
	quantity: number;
	frequency: number;
	alternateTotal: number;
}
