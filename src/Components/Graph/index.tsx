import React, { ReactElement } from "react";
import { Grid, Typography, Card, CardContent } from "@material-ui/core";

import { GraphBreakdown } from "./Breakdown";
import { GraphDetails } from "./Details";
import { GraphLine } from "./Line";
import { GraphStatisticsList } from "./StatisticsList";
import { GraphAdvanced } from "./Advanced";
import { StatisticsState } from "../../Hooks/SearchStatistics";
import { GetFrequencyTotal, IsBlank } from "./Functions";
import { PoolStatistic } from "../../Models/Statistics";
import { ModeProps, ModeContext, GetExtendedModes } from "./ModeContext";
import { DataSetProps, DataContext } from "./DataContext";

type GraphProps = StatisticsState & ModeProps;

/**
 * Configures the data for a given symbol and renders a graph and a statistics breakdown panel
 */
export const Graph = (props: GraphProps): ReactElement => {
	const getDataSet = (): DataSetProps => {
		let filteredSet: PoolStatistic[] = [];
		if (props.poolCombination && props.poolCombination.statistics) {
			filteredSet = props.poolCombination.statistics.filter(f => f.symbol === props.mode).sort((n1, n2) => n1.quantity - n2.quantity);
		}
		return { filteredSet: filteredSet, totalFrequency: GetFrequencyTotal(filteredSet) };
	};

	const label = GetExtendedModes(props.mode);

	return (
		<Grid container>
			<DataContext.Provider value={getDataSet()}>
				<ModeContext.Provider value={label}>
					<Grid item xs={12}>
						<Card>
							<CardContent>
								<Typography gutterBottom variant="h4" component="h4">
									Distribution of {label.mode} {!IsBlank(label.negativeMode) ? `and ${label.negativeMode}` : ""}
								</Typography>
								<GraphLine />
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} lg={6}>
						<GraphDetails />
					</Grid>
					<Grid item xs={12} lg={6}>
						<GraphBreakdown />
					</Grid>
					<Grid item xs={12} lg={6}>
						<GraphAdvanced />
					</Grid>
					<Grid item xs={12} lg={6}>
						<GraphStatisticsList />
					</Grid>
				</ModeContext.Provider>
			</DataContext.Provider>
		</Grid>
	);
};
