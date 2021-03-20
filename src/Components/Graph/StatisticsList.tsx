import React, { ReactElement, useContext } from "react";
import { Typography, Table, TableBody, TableRow, TableHead, TableCell, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Format, IsBlank } from "./Functions";
import { ModeContext } from "./ModeContext";
import { DataContext } from "./DataContext";
import { FormattedMessage } from "react-intl";

/**
 * Renders a table with the raw data used for populating the tables and statistics data
 */
export const GraphStatisticsList = (): ReactElement => {
	const { filteredSet } = useContext(DataContext);
	const { mode, alternateMode } = useContext(ModeContext);

	return (
		<ExpansionPanel>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
				<Typography>
					<FormattedMessage id="DataTable" />
				</Typography>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell align="right">
								<FormattedMessage id="DataTable.Net" values={{ a: mode }} />
							</TableCell>
							<TableCell align="right">
								<FormattedMessage id="DataTable.Frequency" />
							</TableCell>
							{!IsBlank(alternateMode) && (
								<TableCell align="right">
									<FormattedMessage id="DataTable.Total" values={{ a: alternateMode }} />
								</TableCell>
							)}
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
