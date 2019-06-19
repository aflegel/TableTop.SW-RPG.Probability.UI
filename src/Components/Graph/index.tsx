import React, { FunctionComponent, ReactElement } from "react";
import { Grid, Typography, Card, CardContent } from "@material-ui/core";

import { GraphBreakdown } from "./Breakdown";
import { GraphDetails } from "./Details";
import { GraphLine } from "./Line";
import { GraphResultList } from "./ResultList";
import { GraphAdvanced } from "./Advanced";
import { DieSymbol, PoolStatistic } from "../../Models";
import { IStatisticsState } from "../../Hooks/SearchStatistics";
import { GetFrequencyTotal, IsBlank } from "./Functions";

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
export const Graph: FunctionComponent<GraphProps> = (props: GraphProps): ReactElement => {
	const getModes = (): IExtendedModeProps => {
		switch (props.mode) {
			case "Success":
				return { negativeMode: "Failure", alternateMode: "Advantage" };
			case "Advantage":
				return { negativeMode: "Threat", alternateMode: "Success" };
			default:
				return { negativeMode: "Blank", alternateMode: "Blank" };
		}
	};

	const getLabels = (): IExtendedModeProps & IModeProps => {
		return { ...props, ...getModes() };
	};

	const getDataSet = (): IDataSetProps => {
		let filteredSet: PoolStatistic[] = [];
		if (props.poolCombination && props.poolCombination.poolStatistics) {
			filteredSet = props.poolCombination.poolStatistics.filter(f => f.symbol === props.mode).sort((n1, n2) => n1.quantity - n2.quantity);
		}
		return { filteredSet: filteredSet, totalFrequency: GetFrequencyTotal(filteredSet) };
	};

	const label = getLabels();
	const dataSet = getDataSet();

	const extraLabel = (): string => !IsBlank(label.negativeMode) ? `and ${label.negativeMode}` : "";

	return (
		<Grid container>
			<Grid item xs={12}>
				<Card>
					<CardContent>
						<Typography gutterBottom variant="h4" component="h4">
							Distribution of {props.mode} {extraLabel()}
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
				<GraphResultList {...label} {...dataSet} />
			</Grid>
		</Grid>
	);
};
