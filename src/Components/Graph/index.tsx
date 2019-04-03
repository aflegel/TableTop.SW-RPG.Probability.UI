import React, { FunctionComponent } from "react";
import { GraphBreakdown } from "./Breakdown";
import { GraphDetails } from "./Details";
import { GraphLine } from "./Line";
import { DieSymbol } from "../../Models/DieSymbol";
import { IStatisticsState } from "../../Hooks/SearchStatistics/StatisticState";
import { PoolStatistic } from "../../Models/PoolStatistic";
import { GetFrequencyTotal } from "../Statistics/Functions";
import { Grid, Typography } from "@material-ui/core";

type GraphProps = IStatisticsState & IGraphProps;

export interface IGraphProps {
	mode: DieSymbol;
}

export interface ILabel {
	counterMode: DieSymbol;
	offLabel: string;
}

/**
 * Configures the data for a given symbol and renders a graph and a statistics breakdown panel
 */
export const Graph: FunctionComponent<GraphProps> = (props: GraphProps) => {
	let filteredSet: PoolStatistic[] = [];
	if (props.poolCombination && props.poolCombination.poolStatistics)
		filteredSet = props.poolCombination.poolStatistics.filter(f => f.symbol == props.mode).sort((n1, n2) => n1.quantity - n2.quantity);

	const frequency = GetFrequencyTotal(filteredSet);

	const GetLabels = (): ILabel => {
		switch (props.mode) {
			case DieSymbol.Success:
				return { counterMode: DieSymbol.Failure, offLabel: "Average Advantage" };
			case DieSymbol.Advantage:
				return { counterMode: DieSymbol.Threat, offLabel: "Average Success" };
			case DieSymbol.Triumph:
				return { counterMode: DieSymbol.Despair, offLabel: "" };
			default:
				return { counterMode: DieSymbol.Blank, offLabel: "" };
		}
	};

	const label = GetLabels();

	return (
		<Grid container>
			<Grid item xs={12}>
				<Typography gutterBottom variant="h4" component="h4">
					Distribution of {DieSymbol[props.mode]} and {DieSymbol[label.counterMode]}
				</Typography>
				<GraphLine {...label} mode={props.mode} label={DieSymbol[props.mode]} filteredSet={filteredSet} totalFrequency={frequency} />
			</Grid>
			<Grid item xs={12}>
				<GraphBreakdown {...label} mode={props.mode} filteredSet={filteredSet} totalFrequency={frequency} />
			</Grid>
			<Grid item xs={12}>
				<GraphDetails {...label} mode={props.mode} />
			</Grid>
		</Grid>
	);
};
