import React, { ReactElement } from "react";
import { Grid, Typography, Card, CardContent } from "@material-ui/core";

import { GraphBreakdown } from "./Breakdown";
import { GraphDetails } from "./Details";
import { GraphLine } from "./Line";
import { GraphStatisticsList } from "./StatisticsList";
import { GraphAdvanced } from "./Advanced";
import { DieSymbol } from "../../Models";
import { StatisticsState } from "../../Hooks/SearchStatistics";
import { GetFrequencyTotal, IsBlank } from "./Functions";
import { PoolStatistic } from "../../Models/Statistics";

type GraphProps = StatisticsState & ModeProps;

export interface ModeProps {
	mode: DieSymbol;
}

export interface DataSetProps {
	totalFrequency: number;
	filteredSet: PoolStatistic[];
}

export interface ExtendedModeProps {
	negativeMode: DieSymbol;
	alternateMode: DieSymbol;
}

/**
 * Configures the data for a given symbol and renders a graph and a statistics breakdown panel
 */
export const Graph = (props: GraphProps): ReactElement => {
	const getModes = (): ExtendedModeProps => {
		switch (props.mode) {
			case "Success":
				return { negativeMode: "Failure", alternateMode: "Advantage" };
			case "Advantage":
				return { negativeMode: "Threat", alternateMode: "Success" };
			default:
				return { negativeMode: "Blank", alternateMode: "Blank" };
		}
	};

	const getLabels = (): ExtendedModeProps & ModeProps => {
		return { ...props, ...getModes() };
	};

	const getDataSet = (): DataSetProps => {
		let filteredSet: PoolStatistic[] = [];
		if (props.poolCombination && props.poolCombination.statistics) {
			filteredSet = props.poolCombination.statistics.filter(f => f.symbol === props.mode).sort((n1, n2) => n1.quantity - n2.quantity);
		}
		return { filteredSet: filteredSet, totalFrequency: GetFrequencyTotal(filteredSet) };
	};

	const label = getLabels();
	const dataSet = getDataSet();

	return (
		<Grid container>
			<Grid item xs={12}>
				<Card>
					<CardContent>
						<Typography gutterBottom variant="h4" component="h4">
							Distribution of {props.mode} {!IsBlank(label.negativeMode) ? `and ${label.negativeMode}` : ""}
						</Typography>
						<GraphLine {...label} {...dataSet} />
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={12} lg={6}>
				<GraphDetails {...label} />
			</Grid>
			<Grid item xs={12} lg={6}>
				<GraphBreakdown {...label} {...dataSet} />
			</Grid>
			<Grid item xs={12} lg={6}>
				<GraphAdvanced {...dataSet} />
			</Grid>
			<Grid item xs={12} lg={6}>
				<GraphStatisticsList {...label} {...dataSet} />
			</Grid>
		</Grid>
	);
};
