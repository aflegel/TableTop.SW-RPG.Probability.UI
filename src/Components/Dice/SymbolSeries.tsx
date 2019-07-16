import React, { FunctionComponent, ReactElement } from "react";
import { Symbol } from "./Symbol";
import { RollSymbol } from "../../Models/Roll";

export interface SymbolSeriesProps {
	symbol: RollSymbol;
}

/**
 * Returns a set icons for the die and quantity
 */
export const SymbolSeries: FunctionComponent<SymbolSeriesProps> = (props: SymbolSeriesProps): ReactElement => {
	const output: JSX.Element[] = [];

	for (let i = 0; i < props.symbol.quantity; i++) {
		output.push(<Symbol dieSymbol={props.symbol.symbol} key={`${props.symbol.symbol}${i}`}  />);
	}

	return <>{output}</>;
};
