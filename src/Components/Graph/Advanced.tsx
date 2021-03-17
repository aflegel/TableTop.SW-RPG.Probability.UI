import React, { ChangeEvent, ReactElement, useContext, useState } from "react";
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

const filterByComparison = (dataSet: PoolStatistic[], comparison: string, quantity: number): PoolStatistic[] => {
	switch (comparison) {
		case "GT":
			return dataSet.filter((f) => f.quantity > quantity);
		case "GTE":
			return dataSet.filter((f) => f.quantity >= quantity);
		case "E":
			return dataSet.filter((f) => f.quantity === quantity);
		case "LTE":
			return dataSet.filter((f) => f.quantity <= quantity);
		case "LT":
			return dataSet.filter((f) => f.quantity < quantity);
		default:
			return [];
	}
};

/**
 * Calculates the statictical model and builds a definition list for that data
 */
export const GraphAdvanced = (): ReactElement => {
	const { filteredSet, totalFrequency } = useContext(DataContext);

	const [state, setState] = useState({
		comparison: "LT",
		quantity: 0,
	});

	const changeComparison = (event: ChangeEvent<HTMLInputElement>): void => {
		setState({
			...state,
			comparison: event.target.value,
		});
	};

	const changeQuantity = (event: ChangeEvent<HTMLInputElement>): void => {
		setState({
			...state,
			quantity: +event.target.value,
		});
	};

	return (
		<ExpansionPanel>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
				<Typography>Advanced</Typography>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<TextField select margin="normal" value={state.comparison} onChange={changeComparison} aria-label="Comparison">
					{comparisons.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</TextField>
				<TextField type="number" margin="normal" value={state.quantity} onChange={changeQuantity} aria-label="Compare to" />
				<List>
					<ListItem>
						<ListItemText
							primary="Probability"
							secondary={`${Format(GetProbability(GetFrequencyTotal(filterByComparison(filteredSet, state.comparison, state.quantity)), totalFrequency), true)}%`}
						/>
					</ListItem>
				</List>
			</ExpansionPanelDetails>
		</ExpansionPanel>
	);
};
