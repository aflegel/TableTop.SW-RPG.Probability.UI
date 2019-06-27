import React, { FunctionComponent, ReactElement } from "react";
import { RollSymbol } from "../../Models/Roll";
import { SymbolSeries } from "./SymbolSeries";

export interface ISymbolsProps {
	symbols: RollSymbol[];
}

/**
 * Returns a sorted array of icons for the given dice set
 */
export const Symbols: FunctionComponent<ISymbolsProps> = (props: ISymbolsProps): ReactElement => {
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

	if (props.symbols) {
		return <>{props.symbols.sort(symbolSorter).map(icon => <SymbolSeries symbol={icon} key={`${icon.symbol}${icon.quantity}`} />)}</>;
	}
	else {
		return <></>;
	}
};
