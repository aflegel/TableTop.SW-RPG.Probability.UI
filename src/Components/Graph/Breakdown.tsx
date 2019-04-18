import React, { FunctionComponent } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Typography } from "@material-ui/core";

import { DieSymbol } from "../../Models/DieSymbol";
import { Format, GetFrequencyTotal, GetAverage, GetStandardDeviation, AverageLabel } from "./Functions";
import { IModeProps, IExtendedModeProps, IDataSetProps } from ".";

export type IGraphBreakdownProps = IModeProps & IExtendedModeProps & IDataSetProps;

/**
 * Calculates the statictical model and builds a definition list for that data
 */
export const GraphBreakdown: FunctionComponent<IGraphBreakdownProps> = (props: IGraphBreakdownProps) => {
	const positiveFrequency = GetFrequencyTotal(props.filteredSet.filter(f => f.quantity > 0));
	//success mode requires 0 quantity outcomes as well
	const negativeFrequency = GetFrequencyTotal(props.filteredSet.filter(f => f.quantity < (props.mode == DieSymbol.Success ? 1 : 0)));

	const average = GetAverage(props.filteredSet, props.totalFrequency);
	const standardDeviation = GetStandardDeviation(props.filteredSet, props.totalFrequency, average);

	return (
		<ExpansionPanel>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
				<Typography>Probability Breakdowns</Typography>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<List>
					<ListItem>
						<ListItemText primary="Total Frequency" secondary={Format(props.totalFrequency, false)} />
					</ListItem>
					<ListItem>
						<ListItemText primary={`${DieSymbol[props.mode]} Frequency`} secondary={Format(positiveFrequency, false)} />
					</ListItem>
					<ListItem>
						<ListItemText primary={`Probability of ${DieSymbol[props.mode]}`} secondary={`${Format((positiveFrequency / props.totalFrequency) * 100, true)}%`} />
					</ListItem>
					<ListItem>
						<ListItemText primary={`${DieSymbol[props.negativeMode]} Frequency`} secondary={Format(negativeFrequency, false)} />
					</ListItem>
					<ListItem>
						<ListItemText primary={`Probability of ${DieSymbol[props.negativeMode]}`} secondary={`${Format((negativeFrequency / props.totalFrequency) * 100, true)}%`} />
					</ListItem>
					<ListItem>
						<ListItemText primary={AverageLabel(props.mode)} secondary={Format(average, false)} />
					</ListItem>
					<ListItem>
						<ListItemText primary="Standard Deviation" secondary={Format(standardDeviation, false)} />
					</ListItem>
				</List>
			</ExpansionPanelDetails>
		</ExpansionPanel>
	);
};
