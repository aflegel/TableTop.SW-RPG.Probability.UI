import React, { ReactElement } from "react";
import { Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, List, ListItem, ListItemText } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { Format, GetFrequencyTotal, GetAverage, GetStandardDeviation, AverageLabel, IsBlank } from "./Functions";
import { ModeProps, ExtendedModeProps, DataSetProps } from ".";

export type GraphBreakdownProps = ModeProps & ExtendedModeProps & DataSetProps;

/**
 * Calculates the statictical model and builds a definition list for that data
 */
export const GraphBreakdown = (props: GraphBreakdownProps): ReactElement => {
	const positiveFrequency = GetFrequencyTotal(props.filteredSet.filter(f => f.quantity > 0));
	// success mode requires 0 quantity outcomes as well
	const negativeFrequency = GetFrequencyTotal(props.filteredSet.filter(f => f.quantity < (props.mode === "Success" ? 1 : 0)));

	const average = GetAverage(props.filteredSet, props.totalFrequency);
	const standardDeviation = GetStandardDeviation(props.filteredSet, props.totalFrequency, average);

	return <ExpansionPanel>
		<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
			<Typography>Probability Breakdowns</Typography>
		</ExpansionPanelSummary>
		<ExpansionPanelDetails>
			<List>
				<ListItem>
					<ListItemText primary="Total Frequency" secondary={Format(props.totalFrequency, false)} />
				</ListItem>
				<ListItem>
					<ListItemText primary={`${props.mode} Frequency`} secondary={Format(positiveFrequency, false)} />
				</ListItem>
				<ListItem>
					<ListItemText primary={`Probability of ${props.mode}`} secondary={`${Format((positiveFrequency / props.totalFrequency) * 100, true)}%`} />
				</ListItem>
				{
					!IsBlank(props.alternateMode) &&
					<>
						<ListItem>
							<ListItemText primary={`${props.negativeMode} Frequency`} secondary={Format(negativeFrequency, false)} />
						</ListItem>
						<ListItem>
							<ListItemText primary={`Probability of ${props.negativeMode}`} secondary={`${Format((negativeFrequency / props.totalFrequency) * 100, true)}%`} />
						</ListItem>
					</>
				}
				<ListItem>
					<ListItemText primary={AverageLabel(props.mode)} secondary={Format(average, false)} />
				</ListItem>
				<ListItem>
					<ListItemText primary="Standard Deviation" secondary={Format(standardDeviation, false)} />
				</ListItem>
			</List>
		</ExpansionPanelDetails>
	</ExpansionPanel>;
};
