import React, { FunctionComponent, ReactElement } from "react";
import { TableRow, TableCell } from "@material-ui/core";
import { PoolRoll } from "../../Models";
import { Symbols } from "../Dice/Symbols";


export interface IGraphResultListRowProps {
	poolResults: PoolRoll[];
}

/**
 * Calculates the statictical model and builds a definition list for that data
 */
export const ResultListRow: FunctionComponent<IGraphResultListRowProps> = (props: IGraphResultListRowProps): ReactElement => {
	const resultSorter = (n1: PoolRoll, n2: PoolRoll) => {
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

	return <>{
		props.poolResults.sort(resultSorter).map(combination => (
			<TableRow key={combination.symbols.map(icon => `${icon.symbol}${icon.quantity}`).join(",") + combination.frequency}>
				<TableCell align="right"><Symbols symbols={combination.symbols} /></TableCell>
				<TableCell align="right">{combination.frequency}</TableCell>
			</TableRow>
		))
	}</>;
};
