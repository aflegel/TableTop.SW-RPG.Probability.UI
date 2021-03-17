import React, { ReactElement } from "react";
import { Grid, Card, CardContent } from "@material-ui/core";

import { GraphBreakdown } from "./Breakdown";
import { GraphDetails } from "./Details";
import { GraphLine } from "./Line";
import { GraphStatisticsList } from "./StatisticsList";
import { GraphAdvanced } from "./Advanced";
import { GraphTitle } from "./Title";
import { ModeProps, ModeContext, GetExtendedModes } from "./ModeContext";
import { DataSetProps, DataContext } from "./DataContext";
import { GetFrequencyTotal } from "./Functions";
import { StatisticsResults } from "../../Hooks/SearchStatistics/StatisticState";
import { PoolCombination } from "../../Models/Statistics";
import { DieSymbol } from "../../Models";

const getDataSet = (poolCombination: PoolCombination, mode: DieSymbol): DataSetProps => {
	const filteredSet = poolCombination?.statistics?.filter((f) => f.symbol === mode).sort((n1, n2) => n1.quantity - n2.quantity) ?? [];

	return { filteredSet: filteredSet, totalFrequency: GetFrequencyTotal(filteredSet) };
};

/**
 * Configures the data for a given symbol and renders a graph and a statistics breakdown panel
 */
export const Graph = (props: StatisticsResults & ModeProps): ReactElement => (
	<Grid container>
		<DataContext.Provider value={getDataSet(props.poolCombination, props.mode)}>
			<ModeContext.Provider value={GetExtendedModes(props.mode)}>
				<Grid item xs={12}>
					<Card>
						<CardContent>
							<GraphTitle />
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
