import React, { FunctionComponent, ReactElement } from "react";
import { TableRow, TableCell } from "@material-ui/core";
import { RollResult } from "../../Models/Roll";
import { Symbols } from "../Dice/Symbols";

export interface IGraphResultListRowProps {
	poolResults: RollResult[];
}

/**
 * Calculates the statictical model and builds a definition list for that data
 */
export const ResultListRow: FunctionComponent<IGraphResultListRowProps> = (props: IGraphResultListRowProps): ReactElement => {
	const resultSorter = (n1: RollResult, n2: RollResult): number => {
		const freq = n2.frequency - n1.frequency;

		if (freq) {
			return freq;
		} else if (!n2.symbols || !n2.symbols.length) {
			return -1;
		} else if (!n1.symbols || !n1.symbols.length) {
			return 1;
		} else {
			const quan = n2.symbols.map(s => s.quantity).reduce((a, b) => a + b) - n1.symbols.map(s => s.quantity).reduce((a, b) => a + b);

			if (quan) {
				return quan;
			} else {
				return Math.max(...n2.symbols.map(s => s.quantity)) - Math.max(...n1.symbols.map(s => s.quantity));
			}
		}
	};

	const rowKey = (roll: RollResult): string => {

		let symbol = "";
		if (roll.symbols && roll.symbols.length) {
			symbol = roll.symbols.map(icon => `${icon.symbol}${icon.quantity}`).join(",");
		}

		return `${symbol}${roll.frequency}`;
	};

	if (props.poolResults && props.poolResults.length) {
		return <>{
			props.poolResults.sort(resultSorter).map(roll => (
				<TableRow key={rowKey(roll)}>
					<TableCell align="right"><Symbols symbols={roll.symbols} /></TableCell>
					<TableCell align="right">{roll.frequency}</TableCell>
				</TableRow>
			))
		}</>;
	} else {
		return <></>;
	}
};
