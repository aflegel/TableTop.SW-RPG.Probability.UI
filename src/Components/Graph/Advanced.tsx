import React, { FunctionComponent } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";

import { DieSymbol } from "../../Models/DieSymbol";
import { PoolStatistic } from "../../Models/PoolStatistic";
import { Format, GetFrequencyTotal, GetAverage, GetStandardDeviation } from "./Functions";

export interface IGraphAdvancedProps {
	filteredSet: PoolStatistic[];
	totalFrequency: number;
}

/**
 * Calculates the statictical model and builds a definition list for that data
 */
export const GraphAdvanced: FunctionComponent<IGraphAdvancedProps> = (props: IGraphAdvancedProps) => {

	const comparisons = [
		{
			value: 'GT',
			label: '>',
		},
		{
			value: 'GTE',
			label: '>=',
		},
		{
			value: 'E',
			label: '=',
		},
		{
			value: 'LTE',
			label: '<=',
		},
		{
			value: 'LT',
			label: '<',
		},
	];

	const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
		state = {
			value: 'E',
			label: '=',
		};
	};

	let state: any = {
		value: 'GTE',
		label: '>=',
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
					value={state.value}
					onChange={handleChange('currency')}
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
					InputLabelProps={{
						shrink: true,
					}}
					margin="normal"
				/>
			</ExpansionPanelDetails>
		</ExpansionPanel>
	);
};
