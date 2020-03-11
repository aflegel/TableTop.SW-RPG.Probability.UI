import React, { ReactElement, useContext } from "react";
import { Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, List, ListItem, ListItemText, MenuItem, TextField } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { PoolStatistic } from "../../Models/Statistics";
import { Format, GetFrequencyTotal, GetProbability } from "./Functions";
import { DataContext } from "./DataContext";

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

/**
 * Calculates the statictical model and builds a definition list for that data
 */
export const GraphAdvanced = (): ReactElement => {
	const { filteredSet, totalFrequency } = useContext(DataContext);

	const [state, setState] = React.useState({
		comparison: "LT",
		quantity: 0
	});

	const changeComparison = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setState({
			...state,
			comparison: event.target.value,
		});
	};

	const changeQuantity = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setState({
			...state,
			quantity: +event.target.value,
		});
	};

	const getData = (): string => {
		let set: PoolStatistic[];
		switch (state.comparison) {
			case "GT":
				set = filteredSet.filter(f => f.quantity > state.quantity);
				break;
			case "GTE":
				set = filteredSet.filter(f => f.quantity >= state.quantity);
				break;
			case "E":
				set = filteredSet.filter(f => f.quantity === state.quantity);
				break;
			case "LTE":
				set = filteredSet.filter(f => f.quantity <= state.quantity);
				break;
			case "LT":
				set = filteredSet.filter(f => f.quantity < state.quantity);
				break;
			default:
				set = [];
		}

		return Format(GetProbability(GetFrequencyTotal(set), totalFrequency), true);
	};

	return (
		<ExpansionPanel>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
				<Typography>Advanced</Typography>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<TextField select margin="normal" value={state.comparison} onChange={changeComparison} aria-label="Comparison">
					{comparisons.map(option => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</TextField>
				<TextField type="number" margin="normal" value={state.quantity} onChange={changeQuantity} aria-label="Compare to" />
				<List>
					<ListItem>
						<ListItemText primary="Probability" secondary={`${getData()}%`} />
					</ListItem>
				</List>
			</ExpansionPanelDetails>
		</ExpansionPanel>
	);
};
