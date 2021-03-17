import React, { ReactElement, useContext } from "react";
import { Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, List, ListItem, ListItemText } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { Format, GetFrequencyTotal, GetAverage, GetStandardDeviation, AverageLabel, IsBlank } from "./Functions";
import { ModeContext } from "./ModeContext";
import { DataContext } from "./DataContext";

/**
 * Calculates the statictical model and builds a definition list for that data
 */
export const GraphBreakdown = (): ReactElement => {
	const { filteredSet, totalFrequency } = useContext(DataContext);
	const { mode, alternateMode, negativeMode } = useContext(ModeContext);

	const positiveFrequency = GetFrequencyTotal(filteredSet.filter((f) => f.quantity > 0));
	// success mode requires 0 quantity outcomes as well
	const negativeFrequency = GetFrequencyTotal(filteredSet.filter((f) => f.quantity < (mode === "Success" ? 1 : 0)));

	const average = GetAverage(filteredSet, totalFrequency);
	const standardDeviation = GetStandardDeviation(filteredSet, totalFrequency, average);

	return (
		<ExpansionPanel>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
				<Typography>Probability Breakdowns</Typography>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<List>
					<ListItem>
						<ListItemText primary="Total Frequency" secondary={Format(totalFrequency, false)} />
					</ListItem>
					<ListItem>
						<ListItemText primary={`${mode} Frequency`} secondary={Format(positiveFrequency, false)} />
					</ListItem>
					<ListItem>
						<ListItemText primary={`Probability of ${mode}`} secondary={`${Format((positiveFrequency / totalFrequency) * 100, true)}%`} />
					</ListItem>
					{!IsBlank(alternateMode) && (
						<>
							<ListItem>
								<ListItemText primary={`${negativeMode} Frequency`} secondary={Format(negativeFrequency, false)} />
							</ListItem>
							<ListItem>
								<ListItemText primary={`Probability of ${negativeMode}`} secondary={`${Format((negativeFrequency / totalFrequency) * 100, true)}%`} />
							</ListItem>
						</>
					)}
					<ListItem>
						<ListItemText primary={AverageLabel(mode)} secondary={Format(average, false)} />
					</ListItem>
					<ListItem>
						<ListItemText primary="Standard Deviation" secondary={Format(standardDeviation, false)} />
					</ListItem>
				</List>
			</ExpansionPanelDetails>
		</ExpansionPanel>
	);
};
