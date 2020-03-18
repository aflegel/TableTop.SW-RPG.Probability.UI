import React, { ReactElement } from "react";
import { Typography, Table, TableBody, TableRow, TableHead, TableCell, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, TableFooter } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ResultListRow } from "./ResultListRow";

import { Dice } from "../Dice/Dice";
import { Roll } from "../../Models/Roll";

interface GraphResultListProps {
	poolRoll: Roll;
}

/**
 * Renders a table with the raw data used for populating the tables and statistics data
 */
export const RollResultList = (props: GraphResultListProps): ReactElement => {

	const hasData = props.poolRoll.results && props.poolRoll.results.length > 0;

	return <ExpansionPanel>
		<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
			<Typography><Dice dice={props.poolRoll.dice} /></Typography>
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
					<ResultListRow poolResults={props.poolRoll.results} />
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell></TableCell>
						<TableCell align="right">{hasData && <>{props.poolRoll.results.length}, {props.poolRoll.results.map(s => s.frequency).reduce((prev, curr) => (prev || 0) + curr)}</>}</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</ExpansionPanelDetails>
	</ExpansionPanel>;
};
