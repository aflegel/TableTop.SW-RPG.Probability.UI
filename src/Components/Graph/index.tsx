import React, { FunctionComponent } from "react";
import { Grid, Typography, Paper } from "@material-ui/core";

import { GraphBreakdown } from "./Breakdown";
import { GraphDetails } from "./Details";
import { GraphLine } from "./Line";
import { GraphResultList } from "./ResultList";
import { GraphAdvanced } from "./Advanced";
import { DieSymbol } from "../../Models/DieSymbol";
import { IStatisticsState } from "../../Hooks/SearchStatistics/StatisticState";
import { PoolStatistic } from "../../Models/PoolStatistic";
import { GetFrequencyTotal } from "./Functions";

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
	const GetLabels = (): ILabel & IGraphProps => {
		switch (props.mode) {
			case DieSymbol.Success:
				return { mode: props.mode, counterMode: DieSymbol.Failure, offLabel: "Average Advantage" };
			case DieSymbol.Advantage:
				return { mode: props.mode, counterMode: DieSymbol.Threat, offLabel: "Average Success" };
			case DieSymbol.Triumph:
				return { mode: props.mode, counterMode: DieSymbol.Despair, offLabel: "" };
			default:
				return { mode: props.mode, counterMode: DieSymbol.Blank, offLabel: "" };
		}
	};

	let filteredSet: PoolStatistic[] = [];

	if (props.poolCombination && props.poolCombination.poolStatistics)
		filteredSet = props.poolCombination.poolStatistics.filter(f => f.symbol == props.mode).sort((n1, n2) => n1.quantity - n2.quantity);

	const label = GetLabels();
	const frequency = GetFrequencyTotal(filteredSet);

	return (
		<Grid container>
			<Grid item xs={12}>
				<Paper>
					<Typography gutterBottom variant="h4" component="h4">
						Distribution of {DieSymbol[props.mode]} and {DieSymbol[label.counterMode]}
					</Typography>
					<GraphLine {...label} label={DieSymbol[props.mode]} filteredSet={filteredSet} totalFrequency={frequency} />
				</Paper>
			</Grid>
			<Grid item xs={12} lg={6}>
				<GraphDetails {...label} />
			</Grid>
			<Grid item xs={12} lg={6}>
				<GraphBreakdown {...label} filteredSet={filteredSet} totalFrequency={frequency} />
			</Grid>
			<Grid item xs={12} lg={6}>
				<GraphAdvanced filteredSet={filteredSet} totalFrequency={frequency} />
			</Grid>
			<Grid item xs={12} lg={6}>
				<GraphResultList filteredSet={filteredSet} />
			</Grid>
		</Grid>
	);
};
