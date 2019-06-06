import React, { FunctionComponent } from "react";
import { Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, List, ListItem, ListItemText, MenuItem, TextField } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { PoolStatistic } from "../../Models";
import { Format, GetFrequencyTotal, GetProbability } from "./Functions";
import { IDataSetProps } from ".";

/**
 * Calculates the statictical model and builds a definition list for that data
 */
export const GraphAdvanced: FunctionComponent<IDataSetProps> = (props: IDataSetProps) => {
	const [state, setState] = React.useState({
		comparison: "LT",
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

	const changeComparison = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState({
			...state,
			comparison: event.target.value,
		});
	};

	const changeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState({
			...state,
			quantity: +event.target.value,
		});
	};

	const getData = (): string => {
		let set: PoolStatistic[];
		switch (state.comparison) {
			case "GT":
				set = props.filteredSet.filter(f => f.quantity > state.quantity);
				break;
			case "GTE":
				set = props.filteredSet.filter(f => f.quantity >= state.quantity);
				break;
			case "E":
				set = props.filteredSet.filter(f => f.quantity === state.quantity);
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
					margin="normal"
					value={state.comparison}
					onChange={changeComparison}
				>
					{comparisons.map(option => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</TextField>
				<TextField
					type="number"
					margin="normal"
					value={state.quantity}
					onChange={changeQuantity}
				/>

				<List>
					<ListItem>
						<ListItemText primary="Probability" secondary={`${getData()}%`} />
					</ListItem>
				</List>
			</ExpansionPanelDetails>
		</ExpansionPanel>
	);
};
