import React, { ReactElement } from "react";
import { Typography, Table, TableBody, TableRow, TableHead, TableCell, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { PoolStatistic } from "../../Models/Statistics";
import { Format, NetLabel, IsBlank } from "./Functions";
import { ModeProps, ExtendedModeProps, DataSetProps } from ".";

export type GraphResultList = ModeProps & ExtendedModeProps & DataSetProps;

/**
 * Renders a table with the raw data used for populating the tables and statistics data
 */
export const GraphStatisticsList = (props: GraphResultList): ReactElement => {
	const totalTitle = (): ReactElement => <TableCell align="right">Total {props.alternateMode}</TableCell>;

	const totalValue = (combination: PoolStatistic): ReactElement => <TableCell align="right">{Format(combination.alternateTotal, false)}</TableCell>;

	return <ExpansionPanel>
		<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
			<Typography>Data Table</Typography>
		</ExpansionPanelSummary>
		<ExpansionPanelDetails>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell align="right">{NetLabel(props.mode)}</TableCell>
						<TableCell align="right">Frequency</TableCell>
						{!IsBlank(props.alternateMode) && totalTitle()}
					</TableRow>
				</TableHead>
				<TableBody>
					{props.filteredSet.map(combination =>
						<TableRow key={combination.symbol + combination.quantity}>
							<TableCell align="right">{combination.quantity}</TableCell>
							<TableCell align="right">{Format(combination.frequency, false)}</TableCell>
							{!IsBlank(props.alternateMode) && totalValue(combination)}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</ExpansionPanelDetails>
	</ExpansionPanel>;
};
