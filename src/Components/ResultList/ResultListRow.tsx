import React, { ReactElement } from "react";
import { TableRow, TableCell } from "@material-ui/core";
import { RollResult, RollSymbol } from "../../Models/Roll";
import { Symbols } from "../Dice/Symbols";

interface GraphResultListRowProps {
	poolResults: RollResult[];
}

const sumSymbols = (symbolArray: RollSymbol[]): number => symbolArray?.map((s) => s.quantity)?.reduce((a, b) => a + b, 0);

const maxSymbolCount = (symbolArray: RollSymbol[]): number => Math.max(...symbolArray?.map((s) => s.quantity));

const resultSorter = (n1: RollResult, n2: RollResult): number => {
	const netFrequency = n2.frequency - n1.frequency;

	//order by frequency descending
	if (netFrequency) {
		return netFrequency;
	}

	const netSymbols = sumSymbols(n2.symbols) - sumSymbols(n1.symbols);

	return netSymbols ? netSymbols : maxSymbolCount(n2.symbols) - maxSymbolCount(n1.symbols);
};

const symbol = (roll: RollResult): string => roll?.symbols?.map((icon) => `${icon.symbol}${icon.quantity}`)?.join(",") ?? "";

const rowKey = (roll: RollResult): string => `${symbol(roll)}${roll.frequency}`;

/**
 * Calculates the statictical model and builds a definition list for that data
 */
export const ResultListRow = (props: GraphResultListRowProps): ReactElement => (
	<>
		{props?.poolResults?.sort(resultSorter).map((roll) => (
			<TableRow key={rowKey(roll)}>
				<TableCell align="right">
					<Symbols symbols={roll.symbols} />
				</TableCell>
				<TableCell align="right">{roll.frequency}</TableCell>
			</TableRow>
		))}
	</>
);
