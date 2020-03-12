import React, { ReactElement } from "react";
import { RollSymbol } from "../../Models/Roll";
import { SymbolSeries } from "./SymbolSeries";

interface SymbolsProps {
	symbols: RollSymbol[];
}

const symbolSorter = (a: RollSymbol, b: RollSymbol): number => {
	switch (a.symbol) {
		case "Triumph":
			return -1;
		case "Success":
			switch (b.symbol) {
				case "Advantage":
					return -1;
				default:
					return 1;
			}
		case "Advantage":
			return 1;
		case "Despair":
			switch (b.symbol) {
				case "Failure":
				case "Threat":
					return -1;
				default:
					return 1;
			}
		case "Failure":
			switch (b.symbol) {
				case "Threat":
					return -1;
				default:
					return 1;
			}
		case "Threat":
			return 1;
		default:
			return 0;
	}
};

/**
 * Returns a sorted array of icons for the given dice set
 */
export const Symbols = (props: SymbolsProps): ReactElement =>
	<>{props.symbols && props.symbols.sort(symbolSorter).map(icon => <SymbolSeries symbol={icon} key={`${icon.symbol}${icon.quantity}`} />)}</>;
