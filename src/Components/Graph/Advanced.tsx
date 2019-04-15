import React, { FunctionComponent } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";

import { DieSymbol } from "../../Models/DieSymbol";
import { PoolStatistic } from "../../Models/PoolStatistic";
import { Format, GetFrequencyTotal, GetAverage, GetStandardDeviation, GetProbability } from "./Functions";

export interface IGraphAdvancedProps {
	filteredSet: PoolStatistic[];
	totalFrequency: number;
}

/**
 * Calculates the statictical model and builds a definition list for that data
 */
export const GraphAdvanced: FunctionComponent<IGraphAdvancedProps> = (props: IGraphAdvancedProps) => {
	const [state, setState] = React.useState({
		comparison: "GT",
		quantity: 0
	});

	const comparisons = [
		{
			value: "GT",
			label: ">",
		},
		{
			value: "GTE",
			label: ">=",
		},
		{
			value: "E",
			label: "=",
		},
		{
			value: "LTE",
			label: "<=",
		},
		{
			value: "LT",
			label: "<",
		},
	];

	const HandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState({
			...state,
			comparison: event.target.value,
		});
	};

	const GetData = (): string => {
		let set: PoolStatistic[];
		switch (state.comparison) {
			case "GT":
				set = props.filteredSet.filter(f => f.quantity > state.quantity);
				break;
			case "GTE":
				set = props.filteredSet.filter(f => f.quantity >= state.quantity);
				break;
			case "E":
				set = props.filteredSet.filter(f => f.quantity == state.quantity);
				break;
			case "LTE":
				set = props.filteredSet.filter(f => f.quantity <= state.quantity);
				break;
			case "LT":
				set = props.filteredSet.filter(f => f.quantity < state.quantity);
				break;
			default:
				set = [];
		}

		return Format(GetProbability(GetFrequencyTotal(set), props.totalFrequency), true);
	};

	return (
		<ExpansionPanel>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
				<Typography>Advanced</Typography>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<TextField
					select
					label="Comparison"
					value={state.comparison}
					onChange={HandleChange}
					margin="normal"
				>
					{comparisons.map(option => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</TextField>
				<TextField
					id="standard-number"
					label="Number"
					type="number"
					margin="normal"
				/>

				<List>
					<ListItem>
						<ListItemText primary="Probability" secondary={GetData()} />
					</ListItem>
				</List>
			</ExpansionPanelDetails>
		</ExpansionPanel>
	);
};
