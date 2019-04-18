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

import { DieSymbol } from "../../Models/DieSymbol";
import { Format, NetLabel } from "../Graph/Functions";
import { IModeProps, IExtendedModeProps, IDataSetProps } from ".";

export type IGraphResultList = IModeProps & IExtendedModeProps & IDataSetProps;

/**
 * Renders a table with the raw data used for populating the tables and statistics data
 */
export const GraphResultList: FunctionComponent<IGraphResultList> = (props: IGraphResultList) =>
	<ExpansionPanel>
		<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
			<Typography>Data Table</Typography>
		</ExpansionPanelSummary>
		<ExpansionPanelDetails>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell align="right">{NetLabel(props.mode)}</TableCell>
						<TableCell align="right">Frequency</TableCell>
						<TableCell align="right">Total {DieSymbol[props.alternateMode]}</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.filteredSet.map(combination => (
						<TableRow key={DieSymbol[combination.symbol] + combination.quantity}>
							<TableCell align="right">{combination.quantity}</TableCell>
							<TableCell align="right">{Format(combination.frequency, false)}</TableCell>
							<TableCell align="right">{Format(combination.alternateTotal, false)}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</ExpansionPanelDetails>
	</ExpansionPanel>;
