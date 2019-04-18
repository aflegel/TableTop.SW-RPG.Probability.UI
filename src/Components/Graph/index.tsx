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

type GraphProps = IStatisticsState & IModeProps;

export interface IModeProps {
	mode: DieSymbol;
}

export interface IDataSetProps {
	totalFrequency: number;
	filteredSet: PoolStatistic[];
}

export interface IExtendedModeProps {
	negativeMode: DieSymbol;
	alternateMode: DieSymbol;
}

/**
 * Configures the data for a given symbol and renders a graph and a statistics breakdown panel
 */
export const Graph: FunctionComponent<GraphProps> = (props: GraphProps) => {
	const GetLabels = (): IExtendedModeProps & IModeProps => {
		return { ...props, ...GetAlternate() };
	};

	const GetAlternate = (): IExtendedModeProps => {
		switch (props.mode) {
			case DieSymbol.Success:
				return { negativeMode: DieSymbol.Failure, alternateMode: DieSymbol.Advantage };
			case DieSymbol.Advantage:
				return { negativeMode: DieSymbol.Threat, alternateMode: DieSymbol.Success };
			case DieSymbol.Triumph:
				return { negativeMode: DieSymbol.Despair, alternateMode: DieSymbol.Blank };
			default:
				return { negativeMode: DieSymbol.Blank, alternateMode: DieSymbol.Blank };
		}
	};

	const GetDataSet = (): IDataSetProps => {
		let filteredSet: PoolStatistic[] = [];
		if (props.poolCombination && props.poolCombination.poolStatistics) {
			filteredSet = props.poolCombination.poolStatistics.filter(f => f.symbol == props.mode).sort((n1, n2) => n1.quantity - n2.quantity);
		}
		return { filteredSet: filteredSet, totalFrequency: GetFrequencyTotal(filteredSet) };
	};

	const label = GetLabels();
	const dataSet = GetDataSet();

	return (
		<Grid container>
			<Grid item xs={12}>
				<Paper>
					<Typography gutterBottom variant="h4" component="h4">
						Distribution of {DieSymbol[props.mode]} and {DieSymbol[label.negativeMode]}
					</Typography>
					<GraphLine {...label} {...dataSet} />
				</Paper>
			</Grid>
			<Grid item xs={12} lg={6}>
				<GraphDetails {...label} />
			</Grid>
			<Grid item xs={12} lg={6}>
				<GraphBreakdown {...label} {...dataSet} />
			</Grid>
			<Grid item xs={12} lg={6}>
				<GraphAdvanced  {...dataSet} />
			</Grid>
			<Grid item xs={12} lg={6}>
				<GraphResultList {...label} {...dataSet} />
			</Grid>
		</Grid>
	);
};
