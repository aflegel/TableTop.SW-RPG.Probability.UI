import React, { FunctionComponent } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Typography } from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { PoolStatistic } from "../../Models/PoolStatistic";
import { DieSymbol } from "../../Models/DieSymbol";
import { Format } from "../Graph/Functions";

export interface IGraphResultList {
	filteredSet: PoolStatistic[];
}

/**
 * Renders a table with the raw data used for populating the tables and statistics data
 */
export const GraphResultList: FunctionComponent<IGraphResultList> = (props: IGraphResultList) =>
	<ExpansionPanel>
		<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
			<Typography>Result Table</Typography>
		</ExpansionPanelSummary>
		<ExpansionPanelDetails>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Symbol</TableCell>
						<TableCell align="right">Quantity</TableCell>
						<TableCell align="right">Frequency</TableCell>
						<TableCell align="right">Alternate Total</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.filteredSet.map(combination => (
						<TableRow>
							<TableCell>{DieSymbol[combination.symbol]}</TableCell>
							<TableCell align="right">{combination.quantity}</TableCell>
							<TableCell align="right">{Format(combination.frequency, false)}</TableCell>
							<TableCell align="right">{Format(combination.alternateTotal, false)}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</ExpansionPanelDetails>
	</ExpansionPanel>;
