import React, { FunctionComponent, ReactElement } from "react";
import { Typography, Table, TableBody, TableRow, TableHead, TableCell, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, TableFooter } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ResultListRow } from "./ResultRow";

import { PoolResult } from "../../Models/PoolResult";
import { Dice } from "../Dice/Dice";

export interface IGraphResultListProps {
	poolResult: PoolResult;
}

/**
 * Renders a table with the raw data used for populating the tables and statistics data
 */
export const RollResultList: FunctionComponent<IGraphResultListProps> = (props: IGraphResultListProps): ReactElement => {

	const getTotal = () => {
		if (props.poolResult.poolResults && props.poolResult.poolResults.length > 0) {
			return <>{props.poolResult.poolResults.length}, {props.poolResult.poolResults.map(s => s.frequency).reduce((prev, curr) => (prev || 0) + curr)}</>;
		}
		else { return 0; }
	}

	return <ExpansionPanel>
		<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
			<Typography><Dice dice={props.poolResult.dice} /></Typography>
		</ExpansionPanelSummary>
		<ExpansionPanelDetails>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell align="right">Symbols</TableCell>
						<TableCell align="right">Frequency</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<ResultListRow poolResults={props.poolResult.poolResults} />
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell></TableCell>
						<TableCell align="right">{getTotal()}</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</ExpansionPanelDetails>
	</ExpansionPanel>;
};
