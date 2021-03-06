import React, { ReactElement } from "react";
import { Symbol } from "./Symbol";
import { RollSymbol } from "../../Models/Roll";

/**
 * Returns a set icons for the die and quantity
 */
export const SymbolSeries = (props: { symbol: RollSymbol }): ReactElement => {
	const output: ReactElement[] = [];

	for (let i = 0; i < props.symbol.quantity; i++) {
		output.push(<Symbol dieSymbol={props.symbol.symbol} key={`${props.symbol.symbol}${i}`} />);
	}

	return <>{output}</>;
};
