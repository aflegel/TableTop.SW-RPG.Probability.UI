import React, { FunctionComponent, ReactElement } from "react";
import { TableRow, TableCell } from "@material-ui/core";
import { PoolResult } from "../../Models";
import { Symbols } from "../Dice/Symbols";

export interface IGraphResultListRowProps {
	poolResults: PoolResult[];
}

/**
 * Calculates the statictical model and builds a definition list for that data
 */
export const ResultListRow: FunctionComponent<IGraphResultListRowProps> = (props: IGraphResultListRowProps): ReactElement => {
	const resultSorter = (n1: PoolResult, n2: PoolResult): number => {
		const freq = n2.frequency - n1.frequency;

		if (freq) {
			return freq;
		} else if (!n2.rollSymbols || !n2.rollSymbols.length) {
			return -1;
		} else if (!n1.rollSymbols || !n1.rollSymbols.length) {
			return 1;
		} else {
			const quan = n2.rollSymbols.map(s => s.quantity).reduce((a, b) => a + b) - n1.rollSymbols.map(s => s.quantity).reduce((a, b) => a + b);

			if (quan) {
				return quan;
			} else {
				return Math.max(...n2.rollSymbols.map(s => s.quantity)) - Math.max(...n1.rollSymbols.map(s => s.quantity));
			}
		}
	};

	const rowKey = (roll: PoolResult): string => {

		let symbol = "";
		if (roll.rollSymbols && roll.rollSymbols.length) {
			symbol = roll.rollSymbols.map(icon => `${icon.symbol}${icon.quantity}`).join(",");
		}

		return `${symbol}${roll.frequency}`;
	};

	if (props.poolResults && props.poolResults.length) {
		return <>{
			props.poolResults.sort(resultSorter).map(roll => (
				<TableRow key={rowKey(roll)}>
					<TableCell align="right"><Symbols symbols={roll.rollSymbols} /></TableCell>
					<TableCell align="right">{roll.frequency}</TableCell>
				</TableRow>
			))
		}</>;
	} else {
		return <></>;
	}
};
