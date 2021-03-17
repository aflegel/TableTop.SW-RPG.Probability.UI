import React, { ReactElement, useContext } from "react";
import { Typography, Table, TableBody, TableRow, TableHead, TableCell, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Format, NetLabel, IsBlank } from "./Functions";
import { ModeContext } from "./ModeContext";
import { DataContext } from "./DataContext";

/**
 * Renders a table with the raw data used for populating the tables and statistics data
 */
export const GraphStatisticsList = (): ReactElement => {
	const { filteredSet } = useContext(DataContext);
	const { mode, alternateMode } = useContext(ModeContext);

	return (
		<ExpansionPanel>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
				<Typography>Data Table</Typography>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell align="right">{NetLabel(mode)}</TableCell>
							<TableCell align="right">Frequency</TableCell>
							{!IsBlank(alternateMode) && <TableCell align="right">Total {alternateMode}</TableCell>}
						</TableRow>
					</TableHead>
					<TableBody>
						{filteredSet.map((combination) => (
							<TableRow key={combination.symbol + combination.quantity}>
								<TableCell align="right">{combination.quantity}</TableCell>
								<TableCell align="right">{Format(combination.frequency, false)}</TableCell>
								{!IsBlank(alternateMode) && <TableCell align="right">{Format(combination.alternateTotal, false)}</TableCell>}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</ExpansionPanelDetails>
		</ExpansionPanel>
	);
};
